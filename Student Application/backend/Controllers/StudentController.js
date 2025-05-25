const express = require("express");

const DbConnection = require("../db");
const { off } = require("process");

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, dob } = req.body;

    const [result] = await DbConnection.query(
      "INSERT INTO STUDENT (FIRSTNAME, LASTNAME, EMAIL, GENDER, DOB) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, gender, dob]
    );

    const [rows] = await DbConnection.query(
      "SELECT * FROM STUDENT WHERE STUDENT_ID=?",
      [result.insertId]
    );
    res.status(201).json({ data: rows[0] });
  } catch (error) {
    res.send(error.message);
  }
};
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;
    const [totalResult] = await DbConnection.query(
      "SELECT COUNT(*) AS TOTAL FROM STUDENT"
    );

    const total = totalResult[0].TOTAL;

    const [rows] = await DbConnection.query(
      "SELECT * FROM STUDENT ORDER BY STUDENT_ID LIMIT  ? OFFSET  ?",
      [limit, offset]
    );
    res.json({
      total,
      page,
      offset,
      data: rows,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await DbConnection.query(
      "SELECT * FROM STUDENT WHERE STUDENT_ID = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(400).json({ message: "Student Not Found" });
    }

    res.json({ students: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editStudentDetails = async (req, res) => {
  try {
    const [firstName, lastName, email, gender, dob] = req.body;
    const id = parseInt(req.query.id);
    const [result] = await DbConnection.query(
      "UPDATE STUDENT SET FIRSTNAME = ?, LASTNAME = ?, EMAIL = ?, GENDER = ?, DOB = ? WHERE STUDENT_ID = ?",
      [firstName, lastName, email, gender, dob, id]
    );

    if (result.affectedRows === 0) {
      res.status(400).json({ error: "Student not found" });
    }
    const [updatedData] = await DbConnection.query(
      "SELECT * FROM STUDENT WHERE STUDENT_ID = ?",
      [id]
    );
    res.json(updatedData[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);

    const [result] = await DbConnection.query(
      "DELETE FROM STUDENT WHERE STUDENT_ID = ?",
      [id]
    );
    if (result.affectedRows == 0) {
      res.status(400).json({ message: "Student Does not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
