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
import Privet from "../privet/Privet";
import Error from "../components/error/Error";
import About from "../pages/About/MainAboutFile/About";
import Contact from "../pages/Contact/MainContactFile/Contact";
import Overview from "../pages/Dashboard/overview/Overview";
import Customers from "../pages/Customers/Customers";
import Orders from "../pages/Dashboard/Orders/Orders";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: (
          <Privet>
            <Shop></Shop>
          </Privet>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
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
      // admin route
      {
        path: "overview",
        element: <Overview></Overview>,
      },
      {
        path: "all-users",
        element:<Customers></Customers>
      },
      {
        path: "all-orders",
        element: <Orders></Orders>
      },

      //farmer route
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
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
