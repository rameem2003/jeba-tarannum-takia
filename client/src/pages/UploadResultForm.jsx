import React, { useState } from "react";
import { useSelector } from "react-redux";

const UploadResultForm = () => {
  const students = useSelector((state) => state.Student.students);

  const [id, setStudentId] = useState(0);
  const [subject, setSubjectCode] = useState("");
  const [marks, setMarks] = useState(0);
  const [grade, setGrade] = useState("");
  const [gpa, setGpa] = useState();

  const subjects = [
    "CSE 2215",
    "CSE 2263",
    "CSE 2264",
    "CSE 2265",
    "CSE 2319",
    "CSE 2367",
    "MATH 2103",
  ];
  //id, subject, marks, grade, gpa

  const handleSubmit = async () => {
    if (!id || !subject || !marks || !gpa || !grade) {
      alert("All fields are required!");
      return;
    }

    const result = { id, subject, marks, grade, gpa };

    await fetch("http://localhost:5000/api/results/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    alert("Result uploaded successfully!");
    location.reload();
  };

  return (
    <div className="bg-white/10 p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Result</h2>

      <select
        value={id}
        onChange={(e) => setStudentId(parseInt(e.target.value))}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      >
        <option value="" className="text-black">
          Select Student ID
        </option>
        {students.map((data) => (
          <option
            key={data.student_id}
            className="text-black"
            value={data.student_id}
          >
            {data.student_id}
          </option>
        ))}
      </select>

      <select
        type="text"
        placeholder="Subject Code"
        value={subject}
        onChange={(e) => setSubjectCode(e.target.value)}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      >
        <option value="" className="text-black">
          Select Subject
        </option>
        {subjects.map((data, i) => (
          <option className=" text-black" value={data}>
            {data}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(parseInt(e.target.value))}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />

      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />
      <input
        type="text"
        placeholder="GPA"
        value={gpa}
        onChange={(e) => setGpa(e.target.value)}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
      >
        Upload Result
      </button>
    </div>
  );
};

export default UploadResultForm;
