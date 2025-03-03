import React from "react";
import Navber from "../components/Navber";
import { Outlet } from "react-router";

const Rootlayout = () => {
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
};

export default Rootlayout;
