const express = require("express");
const users = require("./MOCK_DATA.json");

// to update the JSON File Data.
const fs = require("fs");

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
app.get("/users", (req, res) => {
  const table = `<table border="1">
  <thead>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Gender</th>
  <th>Email</th>
  <th>Job Titiler</th>
  </thead>
  <tbody>
  ${users
    .map(
      (user) => `<tr><td>${user.first_name}</td>
    <td>${user.last_name}</td>
    <td>${user.gender}</td>
    <td>${user.email}</td>
    <td>${user.job_title}</td></tr>`
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
