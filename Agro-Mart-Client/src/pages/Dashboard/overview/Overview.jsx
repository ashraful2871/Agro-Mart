import React from "react";
import SalesCards from "./SalesCards";
import OrderCards from "./OrderCards";
import WeeklySalesChart from "./WeeklySalesChart";
import BestSellingProductsChart from "./BestSellingProductsChart";
import RecentOrderTable from "./RecentOrderTable";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 mt-8 mb-32">
      <div>
        <h2 className="text-xl font-bold">
          {t("dashboard.overview.dashboard_overview")}
        </h2>
      </div>
      <div>
        <SalesCards />
      </div>
      <div>
        <OrderCards />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-stretch">
        <div>
          <WeeklySalesChart />
        </div>
        <div>
          <BestSellingProductsChart />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">
          {t("dashboard.overview.recent_order")}
        </h2>
      </div>
      <div>
        <RecentOrderTable />
      </div>
    </div>
  );
};

export default Overview;
