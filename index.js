const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const enquiryRoutes = require("./routes/enquiryRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/enquiry", enquiryRoutes);

mongoose
  .connect("mongodb+srv://manjay6428:manjay6428@cluster0.18nbi.mongodb.net/")
  .then((res) => console.log("Connected to mongodb successfully"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
