const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/StudentController");

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.editStudentDetails);
router.delete("/delete/:id", studentController.deleteStudent);

module.exports = router;
