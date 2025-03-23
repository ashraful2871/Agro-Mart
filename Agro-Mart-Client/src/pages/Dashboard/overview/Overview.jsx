import React from "react";
import SalesCards from "./SalesCards";
import OrderCards from "./OrderCards";
import WeeklySalesChart from "./WeeklySalesChart";
import BestSellingProductsChart from "./BestSellingProductsChart";
import OrderTable from "./OrderTable";

const Overview = () => {
  return (
    <div className="space-y-8 mt-8 mb-32">
      <div
      ///className="border-2 border-red-500"
      >
        <h2 className=" text-xl font-bold">Dashboard Overview</h2>
      </div>
      <div>
        <SalesCards></SalesCards>
      </div>
      <div>
        <OrderCards></OrderCards>
      </div>
      <div className="grid grid-cols-2 gap-3  items-stretch">
        <div className="  ">
          <WeeklySalesChart />
        </div>
        <div className="  ">
          <BestSellingProductsChart />
        </div>
      </div>
      <div
      ///className="border-2 border-red-500"
      >
        <h2 className=" text-xl font-bold">Recent Order</h2>
      </div>
      <div>
        <OrderTable></OrderTable>
      </div>
    </div>
  );
};

export default Overview;
