import React from "react";
import Navbar from "../components/Navbar";
import UpperNav from "../pages/upperNav/UpperNav";
import "../app.css";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <UpperNav />
      <div className="main-content">{children}</div>
    </>
  );
};

export default MainLayout;
