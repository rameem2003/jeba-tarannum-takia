import React, { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");

  const handleSearch = () => {
    if (studentId.trim() === "") {
      alert("Please enter a Student ID!");
      return;
    }
    // onSearch(studentId);

    navigate(`/result/${studentId}`);
  };
  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg flex flex-col items-center border border-white/20 w-[400px]">
        <h2 className="text-2xl font-semibold text-black mb-4">
          Search Student Results
        </h2>

        {/* Large Input Field */}
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full text-xl px-5 py-3 rounded-lg bg-transparent border-2 border-white/40  outline-none ring-4 ring-blue-500"
        />

        {/* Large Search Button */}
        <button
          onClick={handleSearch}
          className="mt-5 w-full text-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {/* <Search size={24} /> */}
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
