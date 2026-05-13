import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// upload image and return image url
export const imageUpload = async (imageData: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_HOSTING_KEY}`,
    formData
  );
  const image_url = data.data.display_url;
  return image_url;
};

// Notification permission helper
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  if (!("Notification" in window)) {
    return false;
  }
  if (Notification.permission === "granted") return true;
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
};
