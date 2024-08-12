
import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GobalContext";
// import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.min.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "PropertyPulse|Find the perfect rental",
  description: "find your dream rental property",
  keywords: "renta, find rentals,find properties",
};

const Mainlayout = ({ children }) => {
  return (
 
      <AuthProvider>
        <GlobalProvider>
          <html lang="en">
            <body>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
            </body>
          </html>
        </GlobalProvider>
      </AuthProvider>
  
  );
};

export default Mainlayout;
