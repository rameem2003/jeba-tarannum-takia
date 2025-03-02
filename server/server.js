const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
// const rentalRoutes = require("./routes/rental");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
// app.use("/api/rentals", rentalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
