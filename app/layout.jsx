import "@/assets/styles/globals.css";
export const metadata = {
  title: "PropertyPulse|Find the perfect rental",
  description: "find your dream rental property",
  keywords: "renta, find rentals,find properties",
};
const Mainlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default Mainlayout;
