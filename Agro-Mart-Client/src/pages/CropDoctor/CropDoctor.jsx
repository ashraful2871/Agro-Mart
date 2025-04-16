import { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const plant_id_api_key = import.meta.env.VITE_PLANT_ID_API_KEY;
const roboflow_api_key = "6ni1DHc1icSyCqjxurIZ";
const plant_id_api = "https://plant.id/api/v3/health_assessment";

function CropDoctor() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [roboflowResult, setRoboflowResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useRoboflow, setUseRoboflow] = useState(false);
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  console.log(result);
  // Validate image before processing
  const validateImage = (file) => {
    if (!file) return "No file selected";
    if (!file.type.match("image.*"))
      return "Please upload an image file (JPEG, PNG)";
    if (file.size > 5 * 1024 * 1024) return "Image size exceeds 5MB limit";
    return null;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError(null);
    setResult(null);
    setRoboflowResult(null);

    try {
      // Upload image to ImgBB
      const imgRes = await axios.post(image_upload_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!imgRes.data.success) {
        throw new Error("Image upload failed");
      }

      const imageUrl = imgRes.data.data.display_url;
      const img64 = await convertImageUrlToBase64(imageUrl);
      setImage(imageUrl);

      if (useRoboflow) {
        await handleRoboflowDetection(imageUrl);
      } else {
        await handlePlantIdDiagnosis(img64);
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Diagnosis failed. Please try again.";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Authentication failed. Please check your API key.";
        } else if (error.response.status === 429) {
          errorMessage = "Rate limit exceeded. Please wait and try again.";
        } else {
          errorMessage = `Error: ${
            error.response.data?.message || "Unknown error"
          }`;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const convertImageUrlToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error("Failed to convert image to base64");
    }
  };

  const handlePlantIdDiagnosis = async (base64Image) => {
    try {
      const diagnosisRes = await axios.post(
        plant_id_api,
        {
          images: [base64Image],
          latitude: 49.207,
          longitude: 16.608,
          similar_images: true,
        },
        {
          headers: {
            "Api-Key": plant_id_api_key,
            "Content-Type": "application/json",
          },
        }
      );

      const healthData = diagnosisRes.data.result;
      let diagnosisResult = {
        isHealthy: healthData.is_healthy?.binary ?? true,
        disease: "Healthy",
        description: "Your plant appears healthy!",
        treatment: "Maintain current care practices.",
      };

      if (
        healthData.is_healthy?.binary === false &&
        healthData.disease?.suggestions?.length > 0
      ) {
        const disease = healthData.disease.suggestions[0];
        diagnosisResult = {
          isHealthy: false,
          disease: disease.name || "Unknown disease",
          description:
            disease.details?.description ||
            "No detailed description available.",
          treatment: formatTreatment(disease.details?.treatment),
        };
      }

      setResult(diagnosisResult);
    } catch (error) {
      throw new Error("Plant.id API request failed");
    }
  };

  const formatTreatment = (treatment) => {
    if (!treatment) return "No specific treatment information available.";
    const { chemical = [], biological = [], prevention = [] } = treatment;
    let treatmentText = "";
    if (chemical.length > 0) {
      treatmentText += `**Chemical Treatments**:\n${chemical.join("\n")}\n\n`;
    }
    if (biological.length > 0) {
      treatmentText += `**Biological Treatments**:\n${biological.join(
        "\n"
      )}\n\n`;
    }
    if (prevention.length > 0) {
      treatmentText += `**Prevention Methods**:\n${prevention.join("\n")}\n\n`;
    }
    return (
      treatmentText ||
      "Consult a local agricultural expert for treatment options."
    );
  };

  const handleRoboflowDetection = async (imageUrl) => {
    const ROBOFLOW_API = `https://detect.roboflow.com/plantdetector-ti7sx/1?api_key=${roboflow_api_key}&image=${encodeURIComponent(
      imageUrl
    )}`;

    try {
      const response = await axios.get(ROBOFLOW_API);
      const roboflowData = response.data;

      if (roboflowData?.predictions?.length > 0) {
        const topPrediction = roboflowData.predictions[0];
        setRoboflowResult({
          label: topPrediction.class,
          confidence: topPrediction.confidence,
          treatment: getRoboflowTreatment(topPrediction.class),
        });
      } else {
        setRoboflowResult({
          label: "No disease detected",
          confidence: 0,
          treatment: "Maintain current care practices.",
        });
      }
    } catch (error) {
      console.error("Roboflow error:", error);
      setRoboflowResult({
        label: "Error in detection",
        confidence: 0,
        treatment: "Unable to suggest treatment due to detection error.",
      });
    }
  };

  // Basic treatment mapping for Roboflow (extend as needed)
  const getRoboflowTreatment = (label) => {
    const treatments = {
      bacterial_leaf_spot:
        "Apply copper-based bactericides and remove affected leaves.",
      powdery_mildew:
        "Use sulfur-based fungicides and improve air circulation.",
      healthy: "Maintain current care practices.",
    };
    return (
      treatments[label.toLowerCase()] ||
      "Consult a local expert for specific treatment."
    );
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } max-w-lg mx-auto p-6 border rounded-lg shadow-lg`}
    >
      <h2
        className={`${
          theme === "dark" ? "text-green-400" : "text-green-700"
        } text-2xl font-bold mb-6 text-center`}
      >
        🌱 Crop Doctor
      </h2>

      {/* Method toggle */}
      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={useRoboflow}
            onChange={() => setUseRoboflow(!useRoboflow)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <span
            className={`ml-2 text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Use <strong>Roboflow</strong> (instead of Plant.id)
          </span>
        </label>
      </div>

      {/* File input */}
      <div className="mb-6">
        <label
          className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          } block mb-2 text-sm font-medium`}
        >
          Upload Crop Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={`block w-full text-sm
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            ${
              theme === "dark"
                ? "text-gray-300 file:bg-green-600 file:text-white hover:file:bg-green-700"
                : "text-gray-700 file:bg-green-700 file:text-white hover:file:bg-green-600"
            }`}
          disabled={loading}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span
            className={`ml-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Analyzing your crop image...
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {image && (
        <div className="mb-6">
          <h3
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } text-sm font-medium mb-2`}
          >
            Uploaded Image
          </h3>
          <img
            src={image}
            alt="Uploaded crop"
            className="max-h-64 w-full object-contain rounded border border-gray-200"
          />
        </div>
      )}

      {/* Plant.id Result */}
      {result && (
        <div
          className={`p-6 border rounded-lg ${
            result.isHealthy ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <h3 className="text-lg font-bold text-green-800 mb-4">
            {result.isHealthy ? "✅ Healthy Plant" : "⚠️ Disease Detected"}
          </h3>
          <p className="font-semibold mb-2 text-purple-700">
            Diagnosis: {result.disease}
          </p>
          <p className="text-gray-700 mb-4">{result.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold text-green-800 mb-2">
              Recommended Treatment:
            </h4>
            <div className="bg-white p-4 rounded-lg text-sm whitespace-pre-wrap shadow-inner">
              {result.treatment}
            </div>
          </div>
        </div>
      )}

      {/* Roboflow Result */}
      {roboflowResult && (
        <div className="p-6 border rounded-lg bg-yellow-50 mt-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">
            🌿 Roboflow Result
          </h3>
          <p className="text-gray-700 mb-2">Label: {roboflowResult.label}</p>
          <p className="text-gray-700 mb-4">
            Confidence: {(roboflowResult.confidence * 100).toFixed(2)}%
          </p>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">
              Recommended Treatment:
            </h4>
            <div className="bg-white p-4 rounded-lg text-sm shadow-inner">
              {roboflowResult.treatment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropDoctor;
