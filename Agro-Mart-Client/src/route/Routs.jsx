import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import AddProduct from "../pages/Dashboard/FarmersDashboard/AddProduct/AddProduct";
import Shop from "../pages/Shop/Shop";
import ManageProduct from "../pages/Dashboard/FarmersDashboard/ManageProduct/ManageProduct";
import UpdateProduct from "../pages/Dashboard/FarmersDashboard/UpdateProduct/UpdateProduct";
import ProductDetails from "../pages/Dashboard/FarmersDashboard/ProductDetails/ProductDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>
      },
      {
        path: "manageProduct",
        element: <ManageProduct></ManageProduct>,
      },
      {
        path: "product-update/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
    ],
  },
]);
