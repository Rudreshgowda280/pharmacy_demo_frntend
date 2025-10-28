import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import "./styles/App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import HealthConditions from "./components/HealthConditions";

import Categories from "./components/Categories";
import CategoryBar from "./components/CategoryBar";
import MedicineOffers from "./components/MedicineOffers";
import Footer from "./components/Footer";
import Prescription from "./components/Prescription";
import AboutUs from "./components/AboutUs";
import FAQs from "./components/FAQs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PatientForm from "./components/PatientForm";
import PatientConsent from "./components/PatientConsent";
import PatientBasicInfo from "./components/PatientBasicInfo";
import Medicines from "./components/Medicines";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import DoctorConsultation from "./components/DoctorConsultation";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <Header />
        <CategoryBar />
        <Hero />
        <div className="stagger-section">
          <HealthConditions />
        </div>

        <div className="stagger-section">
          <FeaturedProducts />
        </div>

        <div className="stagger-section">
          <Categories />
        </div>
        <div className="stagger-section">
          <MedicineOffers />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/prescription",
    element: (
      <div className="App">
        <Header />
        <Prescription />
        <Footer />
      </div>
    ),
  },
  {
    path: "/medicines",
    element: (
      <div className="App">
        <Header />
        <Medicines />
        <Footer />
      </div>
    ),
  },
  {
    path: "/about-us",
    element: (
      <div className="App">
        <Header />
        <AboutUs />
        <Footer />
      </div>
    ),
  },
  {
    path: "/faqs",
    element: (
      <div className="App">
        <Header />
        <FAQs />
        <Footer />
      </div>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <div className="App">
        <Header />
        <PrivacyPolicy />
        <Footer />
      </div>
    ),
  },
  {
    path: "/patient-basic-info",
    element: (
      <div className="App">
        <Header />
        <PatientBasicInfo />
        <Footer />
      </div>
    ),
  },
  {
    path: "/patient-consent",
    element: (
      <div className="App">
        <Header />
        <PatientConsent />
        <Footer />
      </div>
    ),
  },
  {
    path: "/patient-form",
    element: (
      <div className="App">
        <Header />
        <PatientForm />
        <Footer />
      </div>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/consultation",
    element: (
      <div className="App">
        <Header />
        <DoctorConsultation />
        <Footer />
      </div>
    ),
  },
  {
    path: "/cart",
    element: (
      <div className="App">
        <Header />
        <Cart />
        <Footer />
      </div>
    ),
  },
  {
    path: "/checkout",
    element: (
      <div className="App">
        <Header />
        <Checkout />
        <Footer />
      </div>
    ),
  },
  {
    path: "/order-history",
    element: (
      <div className="App">
        <Header />
        <OrderHistory />
        <Footer />
      </div>
    ),
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-register",
    element: <AdminRegister />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "dashboard",
        element: <Admin />,
      },
      {
        path: "products",
        element: <Admin />,
      },
      {
        path: "pending",
        element: <Admin />,
      },
      {
        path: "orders",
        element: <Admin />,
      },

      {
        path: "reports",
        element: <Admin />,
      },
    ],
  },


], {
  future: {
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <RouterProvider router={router} />
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
