import { useState } from "react";
import { FiSearch, FiEdit, FiTrash, FiEye } from "react-icons/fi";

const customers = [
  { id: "50F0", date: "Mar 22, 2025", name: "Kunjalben Sutariya", email: "kunjalbensutariya@yopmail.com" },
  { id: "5EFC", date: "Mar 21, 2025", name: "Yogesh Soni", email: "eagletechnologies16@gmail.com" },
  { id: "32B6", date: "Mar 19, 2025", name: "Akash", email: "kloudon.cpanel@gmail.com" },
  { id: "8DA8", date: "Mar 18, 2025", name: "Sunay Patel", email: "patelsunay99@gmail.com" },
  { id: "D95B", date: "Mar 13, 2025", name: "Bishnu Kumar Mahato", email: "kumar.bishnu.dhn@gmail.com" },
  { id: "50F0", date: "Mar 22, 2025", name: "Kunjalben Sutariya", email: "kunjalbensutariya@yopmail.com" },
  { id: "5EFC", date: "Mar 21, 2025", name: "Yogesh Soni", email: "eagletechnologies16@gmail.com" },
  { id: "32B6", date: "Mar 19, 2025", name: "Akash", email: "kloudon.cpanel@gmail.com" },
  { id: "8DA8", date: "Mar 18, 2025", name: "Sunay Patel", email: "patelsunay99@gmail.com" },
  { id: "D95B", date: "Mar 13, 2025", name: "Bishnu Kumar Mahato", email: "kumar.bishnu.dhn@gmail.com" },
  { id: "50F0", date: "Mar 22, 2025", name: "Kunjalben Sutariya", email: "kunjalbensutariya@yopmail.com" },
  { id: "5EFC", date: "Mar 21, 2025", name: "Yogesh Soni", email: "eagletechnologies16@gmail.com" },
  { id: "32B6", date: "Mar 19, 2025", name: "Akash", email: "kloudon.cpanel@gmail.com" },
  { id: "8DA8", date: "Mar 18, 2025", name: "Sunay Patel", email: "patelsunay99@gmail.com" },
  { id: "D95B", date: "Mar 13, 2025", name: "Bishnu Kumar Mahato", email: "kumar.bishnu.dhn@gmail.com" },
  { id: "50F0", date: "Mar 22, 2025", name: "Kunjalben Sutariya", email: "kunjalbensutariya@yopmail.com" },
  { id: "5EFC", date: "Mar 21, 2025", name: "Yogesh Soni", email: "eagletechnologies16@gmail.com" },
  { id: "32B6", date: "Mar 19, 2025", name: "Akash", email: "kloudon.cpanel@gmail.com" },
  { id: "8DA8", date: "Mar 18, 2025", name: "Sunay Patel", email: "patelsunay99@gmail.com" },
  { id: "D95B", date: "Mar 13, 2025", name: "Bishnu Kumar Mahato", email: "kumar.bishnu.dhn@gmail.com" },
  { id: "50F0", date: "Mar 22, 2025", name: "Kunjalben Sutariya", email: "kunjalbensutariya@yopmail.com" },
  { id: "5EFC", date: "Mar 21, 2025", name: "Yogesh Soni", email: "eagletechnologies16@gmail.com" },
  { id: "32B6", date: "Mar 19, 2025", name: "Akash", email: "kloudon.cpanel@gmail.com" },
  { id: "8DA8", date: "Mar 18, 2025", name: "Sunay Patel", email: "patelsunay99@gmail.com" },
  { id: "D95B", date: "Mar 13, 2025", name: "Bishnu Kumar Mahato", email: "kumar.bishnu.dhn@gmail.com" },
  { id: "50F0", date: "Mar 22, 2025", name: "Kunjalben Sutariya", email: "kunjalbensutariya@yopmail.com" },
  { id: "5EFC", date: "Mar 21, 2025", name: "Yogesh Soni", email: "eagletechnologies16@gmail.com" },
  { id: "32B6", date: "Mar 19, 2025", name: "Akash", email: "kloudon.cpanel@gmail.com" },
  { id: "8DA8", date: "Mar 18, 2025", name: "Sunay Patel", email: "patelsunay99@gmail.com" },
  { id: "D95B", date: "Mar 13, 2025", name: "Bishnu Kumar Mahato", email: "kumar.bishnu.dhn@gmail.com" },
];

const Customers = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 20;

  // Filter customers by name, email, or ID
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="my-4 space-y-2">
        <h2 className="text-2xl font-bold ">Customers</h2>
        <div className="space-x-2 p-4 w-full bg-[#1f2937] rounded-xl ">
          <button className="bg-transparent text-white border-2 border-white px-4 py-2 rounded">Export</button>
          <button className="bg-transparent text-white border-2 border-white px-4 py-2 rounded">Import</button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex mb-4 bg-[#1f2937] p-4 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Search by name, email, or ID"
          className="w-full p-2 text-black  rounded-l-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-green-600 px-4 py-2">Filter</button>
        <button 
          className="bg-blue-300 px-4 py-2 rounded-r-md"
          onClick={() => setSearch("")} 
        >
          Reset
        </button>
      </div>

      {/* Table (Responsive) */}
      <div className="overflow-x-auto">
        <table className="w-full  bg-[#1f2937] p-4 rounded-xl text-white">
          <thead>
            <tr className=" text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Joining Date</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="p-2">{customer.id}</td>
                  <td className="p-2">{customer.date}</td>
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.email}</td>
                  <td className="p-2 flex space-x-2">
                    <button className="text-blue-400" aria-label="View Customer">
                      <FiEye />
                    </button>
                    <button className="text-yellow-400" aria-label="Edit Customer">
                      <FiEdit />
                    </button>
                    <button className="text-red-400" aria-label="Delete Customer">
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-950 text-white" : "bg-white text-black border-2 "}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Customers;
