import React from "react";
import UserTable from "../users/UserTable";
import { useTranslation } from "react-i18next";

const Customers = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 mt-8 mb-32">
      <div>
        <h2 className="text-xl font-bold">{t("dashboard.customers.title")}</h2>
      </div>

      <UserTable />
    </div>
  );
};

export default Customers;
