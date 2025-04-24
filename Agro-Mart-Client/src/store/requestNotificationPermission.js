export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return false;
    }
  
    if (Notification.permission === "granted") return true;
  
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
  
    return false;
  };
  