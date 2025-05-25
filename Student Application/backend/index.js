const express = require("express");
const cors = require("cors");
const StudentRoutes = require("./Routes/StudentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/nadsoft/studentapp", StudentRoutes);

const PORT = 5000;
// app.get("/", (req, res) => {
//   res.send(
//     `Server Started! Server is listening on PORT ${PORT}\n http://localhost:${PORT}/nadsoft/studentapp`
//   );
// });

app.listen(PORT, () => {
  console.log(
    `Backend Server is listening on PORT ${PORT}\n http://localhost:${PORT}`
  );
});
