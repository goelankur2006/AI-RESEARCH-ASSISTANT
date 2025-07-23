import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const PapersLayout = () => {
  return (
    <>
      <Navbar />
      <div className="papers-layout">
        <div className="papers-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PapersLayout;
