import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer";
export const metadata = {
  title: "PropertyPulse|Find the perfect rental",
  description: "find your dream rental property",
  keywords: "renta, find rentals,find properties",
};

const Mainlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Mainlayout;
