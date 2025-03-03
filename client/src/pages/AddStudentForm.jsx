import React, { useState } from "react";

const AddStudentForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [session, setSession] = useState("");

  const handleSubmit = async () => {
    if (!name || !id || !section || !session) {
      alert("All fields are required!");
      return;
    }

    const student = { id, name, section, session };

    console.log(student);

    await fetch("http://localhost:5000/api/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    alert("Student added successfully!");

    location.reload();
  };

  return (
    <div className="bg-white/10 p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>

      <input
        type="text"
        placeholder="Student ID"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />

      <input
        type="text"
        placeholder="Section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />

      <input
        type="text"
        placeholder="Session"
        value={session}
        onChange={(e) => setSession(e.target.value)}
        className="w-full mb-2 p-3 rounded bg-transparent border-2 border-white/40 text-white"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
      >
        Add Student
      </button>
    </div>
  );
};

export default AddStudentForm;
