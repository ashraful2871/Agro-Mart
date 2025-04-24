import { useEffect, useState } from "react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import UpdateProfileModal from "./UpdateProfileModal";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
    const [role, isRoleLoading] = useRole();
    const user = useAuth();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        if (!isRoleLoading) {
            setLoading(false);
        }
    }, [isRoleLoading]);

    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

  const handleApplyForBecameFarmer = async () => {
    const result = await Swal.fire({
      title: "Do you want to become a farmer?",
      text: "This action will update your role to 'farmer'.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, I want to be a farmer",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.put(`/user/role/${user?.email}`, {
          role: "farmer",
        });

        if (res.data?.role === "farmer") {
          Swal.fire("Success!", "You are now a farmer!", "success");
          queryClient.invalidateQueries(["role", user?.email]);
        } else {
          Swal.fire("Failed!", "Could not update role.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };
    

    if (loading || isRoleLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">User not found!</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Welcome, {user?.displayName || "User"}!
                </h2>

                <img
                    src={user?.photoURL || "/default-profile-pic.jpg"}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 border"
                />

                <p className="uppercase text-gray-600 mb-2">{role || "Role Not Found"}</p>

                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {user?.displayName || "No Name Provided"}
                </h3>

                <p className="text-gray-600 text-sm mb-4">{user?.email || "No email provided"}</p>

                <div className="flex justify-center">
                    <button
                        onClick={openModal}
                        className="bg-[#F6FCDF] hover:bg-[#e7f3c0] text-black px-4 py-2 mr-2 rounded-lg shadow-md transition"
                    >
                        Edit Profile
                    </button>

                    {role !== "farmer" && (
                        <button
                            onClick={handleApplyForBecameFarmer}
                            className="bg-[#F6FCDF] hover:bg-[#e7f3c0] text-black px-4 py-2 rounded-lg shadow-md transition "
                        >
                            Apply for Became a Farmer
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Update Modal */}
            <UpdateProfileModal isOpen={isOpen} closeModal={closeModal} user={user} role={role} />
        </div>
    );
};

export default UserProfile;
