import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";
import AddStudentForm from "./AddStudentForm";
import UploadResultForm from "./UploadResultForm";
import { useDispatch } from "react-redux";
import { allStudents } from "../redux/features/StudentSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  console.log(students);

  // Fetch all students
  useEffect(() => {
    fetch("http://localhost:5000/api/student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data);
        dispatch(allStudents(data.data));
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Student List */}
      <StudentList students={students} />

      {/* Add Student Form */}
      <AddStudentForm />

      {/* Upload Results Form */}
      <UploadResultForm />
    </div>
  );
};

export default Admin;
