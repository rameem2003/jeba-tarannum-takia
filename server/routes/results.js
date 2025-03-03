const db = require("../config/db.config");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let result = await db.query("SELECT * from results WHERE student_id = ?", [
      id,
    ]);

    res.status(200).send({
      success: true,
      msg: "Result Fetch Success",
      data: result[0],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
});

router.post("/add", async (req, res) => {
  const { id, subject, marks, grade, gpa } = req.body;

  if (id && subject && marks && grade && gpa) {
    try {
      const newResult = await db.query(
        "INSERT INTO results (student_id, subject, marks, grade, gpa) VALUES (?, ?, ?, ?, ?)",
        [id, subject, marks, grade, gpa]
      );

      return res.status(201).send({
        success: true,
        msg: "Result Uploaded Success",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: "Internal Server Error",
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
