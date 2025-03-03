import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const ResultDisplay = () => {
  const students = useSelector((state) => state.Student.students);
  const [student, setStudent] = useState(null);
  const [result, setResult] = useState([]);
  const { id } = useParams();

  console.log(result);

  useEffect(() => {
    fetch(`http://localhost:5000/api/student/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data.data[0]);
      })
      .catch((err) => console.error("Error fetching students:", err));

    fetch(`http://localhost:5000/api/results/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.data);
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg text-white">
      {/* Student Info */}
      <h2 className="text-3xl font-semibold text-red-500 text-center">
        {student?.name}
      </h2>
      <p className="text-center font-bold text-lg text-gray-600">
        ID: {student?.student_id}
      </p>

      {/* Table */}
      <div className="mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-center">Marks</th>
              <th className="p-3 text-center">GPA</th>
            </tr>
          </thead>
          <tbody>
            {result.map((result, index) => (
              <tr key={index} className="border-b border-white/20">
                <td className="p-3 text-black">{result.subject}</td>
                <td className="p-3 text-black text-center">{result.marks}</td>
                <td className="p-3 text-black text-center">{result.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultDisplay;
