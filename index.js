const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const bagRoute = require("./routes/bag");
const shoeRoute = require("./routes/shoe");
const styleRoute = require("./routes/style");
const jwt = require("jsonwebtoken");
var cors = require("cors");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);
mongoose.set("useFindAndModify", false);

app.use(express.json());
app.use(cors());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/bag", bagRoute);
app.use("/api/shoes", shoeRoute);
app.use("/api/styles", styleRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} Running`);
});
