const express = require("express");
const users = require("./MOCK_DATA.json");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/rest-api")
  .then(() => {
    console.log("Connected to the MongoDB Server");
  })
  .catch((err) => console.log(err));

// Schemas

const userShema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model

const userObj = mongoose.model("user", userShema);

// to update the JSON File Data.
const fs = require("fs");
const { type } = require("os");
const { timeStamp } = require("console");

const app = express();
app.use(express.json());
const PORT = 8000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running of port : ${PORT}`);
});

// middleware

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "APILogs.text",
    `\n\nURL: ${req.url}\nHostName:${req.hostname}\nPayload : ${JSON.stringify(
      req.body
    )}\nTimeStamp : ${new Date()}`,
    (err, data) => {
      next();
    }
  );
});
app.get("/users", async (req, res) => {
  const getUsers = await userObj.find();

  const table = `<table border="1">
  <thead>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Gender</th>
  <th>Email</th>
  <th>Job Titiler</th>
  </thead>
  <tbody>
  ${getUsers
    .map(
      (user) => `<tr><td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.gender}</td>
    <td>${user.email}</td>
    <td>${user.jobTitle}</td></tr>`
    )
    .join("")}
  </tbody>
  </table>`;

  res.send(table);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  return res.json(user);
});

app.get("/mongoapi/user/:id", async (req, res) => {
  const id = req.params.id;

  const user = await userObj.findById(id);

  return res.json(user);
});

app.post("/api/user", (req, res) => {
  const body = req.body;
  console.log("Form Data : " + body);
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      return res.json({ status: "Success", ID: users.length });
    }
  });
});

app.post("/mongoapi/user", async (req, res) => {
  const body = req.body;

  const result = await userObj.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ status: "User Created Successfully" });

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   if (err) {
  //     res.json({ error: err });
  //   } else {
  //     return res.json({ status: "Success", ID: users.length });
  //   }
  // });
});

// UPDATE (Partial) user by ID
app.patch("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  console.log(id);

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update only the provided fields
  users[userIndex] = { ...users[userIndex], ...updates };

  // Save to file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write file" });
    } else {
      return res.json({ status: "Updated", user: users[userIndex] });
    }
  });
});

app.delete("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users.splice(index, 1);

    // Update file after deletion
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write file" });
      } else {
        return res.json({ status: "Deleted", ID: id });
      }
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/mongoapi/user/:id", async (req, res) => {
  const id = req.params.id;
  const index = userObj.findByIdAndDelete(id);

  if (index) {
    return res.json({ status: "Deleted", ID: id });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
