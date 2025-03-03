const db = require("../config/db.config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let job = await db.query("SELECT * from students");

    res.status(200).send({
      success: true,
      msg: "Student Fetch Success",
      data: job[0],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let job = await db.query("SELECT * from students WHERE student_id = ?", [
      id,
    ]);

    res.status(200).send({
      success: true,
      msg: "Student Fetch Success",
      data: job[0],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
});

// http://localhost:5000/api/student/add
router.post("/add", async (req, res) => {
  const { name, id, session, section } = req.body;
  let existUser = await db.query(
    "SELECT * FROM `students` WHERE student_id = ?",
    [id]
  );

  if (existUser[0].length > 0) {
    return res.status(404).send({
      success: false,
      msg: "Student Already Exist",
    });
  }

  if (name && id && section && section) {
    try {
      const user = await db.query(
        "INSERT INTO students (name, student_id, session, section) VALUES (?, ?, ?, ?)",
        [name, id, session, section]
      );

      return res.status(201).send({
        success: true,
        msg: "New Student Created Success",
        user,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: "internal Server Error",
        error,
      });
    }
  } else {
    return res.status(404).send({
      success: false,
      msg: "Pls fill up all fields",
    });
  }
});

module.exports = router;
