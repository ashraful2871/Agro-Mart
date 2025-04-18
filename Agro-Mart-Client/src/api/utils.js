// upload image and return image url

import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
        formData
    );
    console.log(data)
    const image_url = data.data.display_url
    
    return image_url ;
}
