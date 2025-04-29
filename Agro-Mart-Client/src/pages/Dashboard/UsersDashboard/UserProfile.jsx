import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import UpdateProfileModal from "./UpdateProfileModal";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
  const { t } = useTranslation();
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
      title: t("profile.swal.title"),
      text: t("profile.swal.text"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t("profile.swal.confirm"),
      cancelButtonText: t("profile.swal.cancel"),
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.put(`/user/role/${user?.email}`, {
          role: "farmer",
        });

        if (res.data?.role === "farmer") {
          Swal.fire(
            t("profile.swal.success_title"),
            t("profile.swal.success_text"),
            "success"
          );
          queryClient.invalidateQueries(["role", user?.email]);
        } else {
          Swal.fire(
            t("profile.swal.failed_title"),
            t("profile.swal.failed_text"),
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          t("profile.swal.error_title"),
          t("profile.swal.error_text"),
          "error"
        );
      }
    }
  };

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {t("profile.loading")}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {t("profile.user_not_found")}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {t("profile.welcome", { name: user?.displayName || "User" })}
        </h2>

        <img
          src={user?.photoURL || "/default-profile-pic.jpg"}
          alt="User Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 border"
        />

        <p className="uppercase text-gray-600 mb-2">
          {role || t("profile.role_not_found")}
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {user?.displayName || t("profile.no_name_provided")}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {user?.email || t("profile.no_email_provided")}
        </p>

        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="bg-[#F6FCDF] hover:bg-[#e7f3c0] text-black px-4 py-2 mr-2 rounded-lg shadow-md transition"
          >
            {t("profile.edit_profile")}
          </button>

          {role !== "farmer" && (
            <button
              onClick={handleApplyForBecameFarmer}
              className="bg-[#F6FCDF] hover:bg-[#e7f3c0] text-black px-4 py-2 rounded-lg shadow-md transition"
            >
              {t("profile.apply_farmer")}
            </button>
          )}
        </div>
      </div>

      {/* Profile Update Modal */}
      <UpdateProfileModal
        isOpen={isOpen}
        closeModal={closeModal}
        user={user}
        role={role}
      />
    </div>
  );
};

export default UserProfile;
