import React from "react";
import { Link } from "react-router";

const StudentList = ({ students }) => {
  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">All Students</h2>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-blue-600">
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Section</th>
            <th className="border p-3">Session</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="text-center bg-white/5">
              <td className="border p-3">
                {student.student_id}{" "}
                <Link
                  to={`/result/${student.student_id}`}
                  className=" p-2 rounded-2xl ml-4 bg-red-500 font-bold"
                >
                  Result
                </Link>
              </td>
              <td className="border p-3">{student.name}</td>
              <td className="border p-3">{student.section}</td>
              <td className="border p-3">{student.session}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
