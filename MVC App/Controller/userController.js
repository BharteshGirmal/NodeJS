const Users = require("../Model/userModel");

async function getAllUsers(req, res) {
  const allUsers = await Users.find({});
  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  try {
    const body = req.body;

    console.log(body);

    await Users.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    return res.status(201).json({ status: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" + error.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await Users.findByIdAndUpdate(
      id,
      {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
      },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ status: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await Users.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ status: "Deleted", ID: id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
