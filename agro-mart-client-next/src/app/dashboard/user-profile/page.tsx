"use client";
import useAuth from "@/hooks/useAuth";

export default function UserProfilePage() {
  const user = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">My Profile</h1>
      <div className="bg-base-100 p-6 rounded-xl shadow-md border flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-600">
          <img src={user?.photoURL || "https://i.ibb.co.com/zWQYnrGM/user.png"} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold mt-4">{user?.displayName || "User"}</h2>
        <p className="text-base-content">{user?.email}</p>
      </div>
    </div>
  );
}
