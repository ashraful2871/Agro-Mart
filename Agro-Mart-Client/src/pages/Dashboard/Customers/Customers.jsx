import React from "react";
import UserTable from "../users/UserTable";

const Customers = () => {
  return (
    <div className="space-y-8 mt-8 mb-32">
      <div>
        <h2 className=" text-xl font-bold">Customer</h2>
      </div>

      <UserTable></UserTable>
    </div>
  );
};

export default Customers;
