import { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const plant_id_api_key = import.meta.env.VITE_PLANT_ID_API_KEY;
const plant_id_api = "https://plant.id/api/v3/health_assessment";

function CropDoctor() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please upload an image file (JPEG, PNG)");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const imgRes = await axios.post(image_upload_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!imgRes.data.success) {
        throw new Error("Image upload failed");
      }

      const imageUrl = imgRes.data.data.display_url;
      const img64 = await convertImageUrlToBase64(imageUrl);
      setImage(imageUrl);

      const diagnosisRes = await axios.post(
        plant_id_api,
        {
          images: [img64],
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

      const healthData = diagnosisRes.data;
      console.log(healthData);

      let diagnosisResult = {};

      if (healthData.is_healthy?.binary === true) {
        diagnosisResult = {
          isHealthy: true,
          disease: "Healthy",
          description: "Your plant looks healthy!",
          treatment: "No treatment needed. Keep nurturing your plant!",
        };
      } else if (
        healthData.is_healthy?.binary === false &&
        healthData.disease?.suggestions?.length > 0
      ) {
        const disease = healthData.disease.suggestions[0];
        const treatment =
          disease.details?.treatment?.chemical?.join("\n") ||
          disease.details?.treatment?.biological?.join("\n") ||
          disease.details?.treatment?.prevention?.join("\n") ||
          "No treatment suggestion available for this plant.";
        diagnosisResult = {
          isHealthy: false,
          disease: disease.name,
          description: disease.details?.description || "No description available",
          treatment: treatment,
        };
      } else {
        diagnosisResult = {
          isHealthy: false,
          disease: "Not Healthy",
          description: "Your plant looks not healthy!",
          treatment: "No treatment suggestion available for this plant.",
        };
      }

      setResult(diagnosisResult);
    } catch (error) {
      console.error("Full error:", error);
      let errorMessage = "Diagnosis failed";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Authentication failed. Please check your API key.";
        } else if (error.response.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else {
          errorMessage = `API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
        }
      } else if (error.request) {
        errorMessage = "No response received from the server";
      } else {
        errorMessage = error.message || "An unknown error occurred";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const convertImageUrlToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl, { mode: "cors" });
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace(/^data:image\/\w+;base64,/, "");
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className={`${theme === "dark" ? "bg-[#1F2937]" : "bg-white"} max-w-lg mx-auto p-4 border rounded shadow-lg`}>
      <h2 className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-2xl font-bold mb-4`}>
        🌱 Crop Doctor
      </h2>

      <div className="mb-4">
        <label className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} block mb-2 text-sm font-medium`}>
          Upload Crop Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
            theme === "dark" ? "text-gray-300 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" : "text-gray-700 file:bg-green-700 file:text-white hover:file:bg-green-600"
          }`}
          disabled={loading}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3">Analyzing your crop image...</span>
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <strong>Error:</strong> {error}
          {error.includes("API key") && (
            <p className="mt-2">Please check your VITE_PLANT_ID_API_KEY environment variable</p>
          )}
        </div>
      )}

      {image && (
        <div className="mb-4">
          <h3 className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-sm font-medium mb-2`}>
            Uploaded Image
          </h3>
          <img
            src={image}
            alt="Uploaded crop"
            className="max-h-64 rounded border border-gray-200"
          />
        </div>
      )}

{result && (
  <div className="p-4 border rounded-lg bg-green-50">
    <h3 className="text-lg font-bold text-green-800 mb-2">
      {result.isHealthy ? "✅ Healthy Plant" : "⚠️ Your Plant is Not Healthy!"}
    </h3>

    <p className="font-semibold mb-1 text-purple-700">
      Diagnosis: {result.disease === "Not Healthy" ? "Disease not identified specifically." : result.disease}
    </p>

    <p className="text-gray-700 mb-3">{result.description}</p>

    <div className="mt-3">
      <h4 className="font-semibold text-green-800">Suggested Treatment:</h4>
      <div className="bg-white p-3 rounded mt-2 text-sm">
        {result.disease.suggestions && result.disease.suggestions.length > 0 ? (
          result.disease.suggestions.map((suggestion, index) => (
            <div key={index} className="mb-2">
              <p>{suggestion.name}</p>
            </div>
          ))
        ) : (
          <p>No specific treatment suggestions available for this plant.</p>
        )}
      </div>
    </div>
  </div>
)}


    </div>
  );
}

export default CropDoctor;
