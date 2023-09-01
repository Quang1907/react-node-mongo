const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/TaskRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Connect err:", err));

// app.get("/", (req, res) => {
//   res.send("the brave coders");
// });

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
