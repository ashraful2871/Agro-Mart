import React, { useContext, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UserUpdateModal from "./UserUpdateModal";
import UserViewModal from "./UserViewModal";

const UserTable = () => {
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  
  const openViewModal = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };
  
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateOpen(true);
  };
  
  const closeModal = () => {
    setIsViewOpen(false);
    setIsUpdateOpen(false);
  };

  const { data, refetch } = useQuery({
    queryKey: ["users", page, filterText],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?page=${page}&limit=${limit}&search=${filterText}`);
      return data;
    },
  });

  const users = data?.users || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
      color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/user/${id}`);

          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
            background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
            color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting the user.",
            icon: "error",
            background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
            color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
          });
          console.error("Error deleting user:", error);
        }
      }
    });
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-[#111827]" : "bg-white"} shadow-md rounded-lg`}>
      <div className={`${theme === "dark" ? "bg-[#1F2937]" : "bg-white"} mb-4 py-8 px-5 rounded-lg hidden`}>
        <div className="space-x-2">
          <button  className="btn btn-outline">Export</button>
          <button className="btn btn-outline">Import</button>
        </div>
      </div>

      <div className={`${theme === "dark" ? "bg-[#1F2937]" : "bg-white"} mb-4 grid grid-cols-6 gap-8 py-8 px-5 rounded-lg`}>
      <input
        type="text"
        placeholder="Search by name/email/phone"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          const lastChar = value.slice(-1);

          if (/^[a-zA-Z0-9]$/.test(lastChar) || value === "") {
            setFilterText(value);
            setPage(1);
          }
        }}
        className="input input-bordered w-full col-span-4 py-7"
      />
        <button
          onClick={() => { setSearch(""); setFilterText(""); setPage(1); }}
          className="btn ml-2 col-span-2 h-full"
        >
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>JOINING DATE</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className=" border-2">
                <td className="font-semibold border">{idx + 1}</td>
                <td className="border">{user.date || "5th April"}</td>
                <td className="border">{user.name || "Ashraful"}</td>
                <td className="border">{user.email || "ash2871@gmail.com"}</td>
                <td className="border">{user.phone || "01759030544"}</td>
                <td className="border">
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => openViewModal(user)} 
                    className="btn btn-sm btn-ghost text-primary"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => openUpdateModal(user)} 
                    className="btn btn-sm btn-ghost text-warning"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="btn btn-sm btn-ghost text-error"
                  >
                    <FaTrash />
                  </button>
                </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span>
          SHOWING {(page - 1) * limit + 1}-{Math.min(page * limit, total)} OF {total}
        </span>
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            {"<"}
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`join-item btn btn-sm ${page === idx + 1 ? "btn-success" : ""}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
      {isViewOpen && selectedUser && (
        <UserViewModal
          isOpen={isViewOpen}
          closeModal={closeModal}
          user={selectedUser}
        />
      )}
      
      {isUpdateOpen && selectedUser && (
        <UserUpdateModal
          isOpen={isUpdateOpen}
          closeModal={closeModal}
          user={selectedUser}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UserTable;
