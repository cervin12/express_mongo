require("./config/mongoose");
const express = require("express");
const productRouter = require("./products/routes");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const path = require("path");



const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/v1", productRouter);

// app.use("/", (req, res) => {
//   res.send({
//     message: "Welcome to my express",
//     status: "success",
//   });
// });

app.use((req, res) => {
  res.send({
    status: "failed",
    message: "page not found",
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
