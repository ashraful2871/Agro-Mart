"use client";
export default function OverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-100 p-6 rounded-xl shadow-md border">
          <h3 className="text-sm text-base-content">Total Orders</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-md border">
          <h3 className="text-sm text-base-content">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$0</p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-md border">
          <h3 className="text-sm text-base-content">Total Products</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-md border">
          <h3 className="text-sm text-base-content">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
      </div>
    </div>
  );
}
