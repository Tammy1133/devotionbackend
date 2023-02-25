const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());

const blogRoute = require("./routes/blogRoute");
const devotionRoute = require("./routes/devotionRoute");
const userRoute = require("./routes/userRoute");

app.use("/", blogRoute);
app.use("/", devotionRoute);
app.use("/", userRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db Started"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("app started");
});
