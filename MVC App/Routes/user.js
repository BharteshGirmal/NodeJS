const express = require("express");
const Users = require("../Model/userModel");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../Controller/userController");

// GET all users as HTML table
router.get("/getallusers", async (req, res) => {
  try {
    const getUsers = await Users.find();

    const table = `<table border="1">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Job Title</th>
        </tr>
      </thead>
      <tbody>
        ${getUsers
          .map(
            (user) => `<tr>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.gender}</td>
              <td>${user.email}</td>
              <td>${user.jobTitle}</td>
            </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

    res.send(table);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", getAllUsers);

// GET user by ID
router.get("/:id", getUserById);

// POST create new user
router.post("/", createUser);

// PATCH update user by ID
router.patch("/:id", updateUser);

// DELETE user by ID
router.delete("/:id", deleteUser);

module.exports = router;
