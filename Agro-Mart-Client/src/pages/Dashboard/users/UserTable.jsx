import React, { useContext } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const users = [
//   {
//     id: "81E9",
//     date: "Oct 22, 2024",
//     name: "Justin J. Ruiz",
//     email: "justin@gmail.com",
//     phone: "212-512-2888",
//   },
//   {
//     id: "81E8",
//     date: "Oct 22, 2024",
//     name: "Aurora E. Amerson",
//     email: "aurora@gmail.com",
//     phone: "660-515-7629",
//   },
//   {
//     id: "81E7",
//     date: "Oct 22, 2024",
//     name: "Christopher M. Fox",
//     email: "christopher@gmail.com",
//     phone: "812-886-0550",
//   },
//   {
//     id: "81E6",
//     date: "Oct 22, 2024",
//     name: "James J. Allen",
//     email: "james@gmail.com",
//     phone: "818-356-8600",
//   },
//   {
//     id: "81E5",
//     date: "Oct 22, 2024",
//     name: "Hilary W. Becker",
//     email: "hilary@gmail.com",
//     phone: "802-516-2269",
//   },
//   {
//     id: "81E4",
//     date: "Oct 22, 2024",
//     name: "Jon B. Krueger",
//     email: "jon@gmail.com",
//     phone: "360-943-7332",
//   },
//   {
//     id: "81E3",
//     date: "Oct 22, 2024",
//     name: "Paul R. Bruns",
//     email: "paul@gmail.com",
//     phone: "715-651-7487",
//   },
// ];

const UserTable = () => {
  const { theme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  console.log(users);
  return (
    <div
      className={`p-6 ${
        theme === "dark" ? "bg-[#111827]" : "bg-white"
      }  shadow-md rounded-lg`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-[#1F2937]" : "bg-white"
        } flex justify-between mb-4 py-8 px-5 rounded-lg`}
      >
        <div className="space-x-2">
          <button className="btn btn-outline">Export</button>
          <button className="btn btn-outline">Import</button>
        </div>
      </div>

      <div
        className={` ${
          theme === "dark" ? "bg-[#1F2937]" : "bg-white"
        } mb-4 grid grid-cols-6 gap-8 py-8 px-5 rounded-lg`}
      >
        <input
          type="text"
          placeholder="Search by name/email/phone"
          className="input input-bordered w-full col-span-4 py-7"
        />
        <button className="btn btn-success bg-green-700 ml-2 text-white">
          Filter
        </button>
        <button className="btn  ml-2">Reset</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-end">
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
                <td className="font-semibold text-end border">{idx + 1}</td>
                <td className="border text-end">{user.date || "5th April"}</td>
                <td className="border text-end">{user.name || "Ashraful"}</td>
                <td className="border text-end">
                  {user.email || "ash2871@gmail.com"}
                </td>
                <td className="border text-end">
                  {user.phone || "01759030544"}
                </td>
                <td className="flex justify-end space-x-3">
                  <button className="btn btn-sm btn-ghost text-primary">
                    <FaEye />
                  </button>
                  <button className="btn btn-sm btn-ghost text-warning">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-ghost text-error">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span>SHOWING 141-147 OF 147</span>
        <div className="join">
          <button className="join-item btn btn-sm">{"<"}</button>
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">...</button>
          <button className="join-item btn btn-sm">4</button>
          <button className="join-item btn btn-sm">5</button>
          <button className="join-item btn btn-sm">6</button>
          <button className="join-item btn btn-sm">7</button>
          <button className="join-item btn btn-sm btn-success">8</button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
