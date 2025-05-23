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
import Settings from "../pages/Dashboard/Settings/Settings";
import CouponSettings from "../pages/Dashboard/Settings/AdminSettings/CouponSettings";
import MyOrders from "../pages/Dashboard/UsersDashboard/MyOrders";
import UserProfile from "../pages/Dashboard/UsersDashboard/UserProfile";
import Weather from "../pages/Weather/Weather";
import Success from "../pages/Payment/Success";
import PaymentFail from "../pages/Payment/PaymentFail";
import PaymentCancel from "../pages/Payment/PaymentCancel";
import Reviews from "../pages/reviews/Reviews";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement: <Error></Error>,
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
        path: "/reviews",
        element: <Reviews></Reviews>,
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
        path: "/payment/success",
        element: <Success></Success>,
      },
      {
        path: "/payment/fail",
        element: <PaymentFail></PaymentFail>,
      },
      {
        path: "/payment/cancel",
        element: <PaymentCancel></PaymentCancel>,
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
      {
        path: "settings",
        element: <Settings></Settings>,
      },
      //user route
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "weather",
        element: <Weather></Weather>,
      },
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
