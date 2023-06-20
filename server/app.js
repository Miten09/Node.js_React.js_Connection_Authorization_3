const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

app.use("/", require("./router/auth"));

const PORT = process.env.PORT;

app.get("/about", (req, res) => {
  res.send("Hello World from about page");
});

app.get("/contact", (req, res) => {
  res.cookie("test", "thap");
  res.send("Hello World from contact page");
});

app.get("/signin", (req, res) => {
  res.send("Hello login world");
});

app.get("/signup", (req, res) => {
  res.send("Hello signup world");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
