const express = require("express");
const {
  enquiryCreate,
  enquiryList,
  enquiryDelete,
  enquiryUpdate,
} = require("../controllers/userEnquiryControllers");

const enquiryRoutes = express.Router();

enquiryRoutes.post("/enquiry-create", enquiryCreate);
enquiryRoutes.get("/enquiry-get", enquiryList);
enquiryRoutes.delete("/enquiry/:id", enquiryDelete);
enquiryRoutes.put("/enquiry/:id", enquiryUpdate);

module.exports = enquiryRoutes;
