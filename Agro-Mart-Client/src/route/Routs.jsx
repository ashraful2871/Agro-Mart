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
import Orders from "../pages/Dashboard/Orders/Orders";
import Customers from "../pages/Dashboard/Customers/Customers";
import PasswordReset from "../pages/password-reset/PasswordReset";
import ShoppingCart from "../pages/shopingCart/ShoppingCart";
import Wishlist from "../pages/Shop/Wishlist/Wishlist";
import StripePayment from "../pages/Payment/StripePayment";
import BKashPayment from "../pages/Payment/bKashPayment";
import NagadPayment from "../pages/Payment/NagadPayment";
import SslCommerzePayment from "../pages/Payment/SslCommerzePayment";
import CropDoctor from "../pages/CropDoctor/CropDoctor";
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
        path: "/shopping-cart",
        element: (
          <Privet>
            <ShoppingCart></ShoppingCart>
          </Privet>
        ),
      },
      {
        path: "/payment/stripe",
        element: <StripePayment></StripePayment>,
      },
      {
        path: "payment/bKAsh",
        element: <BKashPayment></BKashPayment>,
      },
      {
        path: "/payment/nagad",
        element: <NagadPayment></NagadPayment>,
      },
      {
        path: "payment/SSLCommerz",
        element: <SslCommerzePayment></SslCommerzePayment>,
      },
      {
        path: "/wish-list",
        element: <Wishlist></Wishlist>,
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
      {
        path: "/password/reset",
        element: <PasswordReset></PasswordReset>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Privet>
        <Dashboard></Dashboard>
      </Privet>
    ),
    children: [
      // admin route
      {
        path: "overview",
        element: <Overview></Overview>,
      },
      {
        path: "all-users",
        element: <Customers></Customers>,
      },
      {
        path: "all-orders",
        element: <Orders></Orders>,
      },

      //farmer route
      {
        path: "crop-doctor",
        element: <CropDoctor></CropDoctor>,
      },
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
