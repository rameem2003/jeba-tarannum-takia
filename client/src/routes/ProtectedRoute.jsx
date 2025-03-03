import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get("token"); // access token
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(null);

  /**
   * check admin is valid or not
   */
  const adminVerify = async () => {
    try {
      let res = await axios.get(
        "http://localhost:5000/api/auth/verify",
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${accessToken}`,
          },
        }
      );
      if (res.status == 200) {
        setValid(true);
      }
    } catch (error) {
      console.log(error);
      setValid(false);
    } finally {
      setLoading(false); // Stop loading after verification
    }
  };

  useEffect(() => {
    adminVerify();
  }, []);

  if (loading) {
    return <h1>Loading......</h1>;
  }
  if (valid) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
