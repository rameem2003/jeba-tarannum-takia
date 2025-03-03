import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { allStudents } from "../redux/features/StudentSlice";

const Navber = () => {
  const dispatch = useDispatch();

  // Fetch all students
  useEffect(() => {
    fetch("http://localhost:5000/api/student")
      .then((res) => res.json())
      .then((data) => {
        dispatch(allStudents(data.data));
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);
  return (
    <nav className="bg-blue-600 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">🎓 Student Portal</h1>
        </Link>

        {/* Admin Login Button */}
        <Link
          to="/login"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100"
        >
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

export default Navber;
