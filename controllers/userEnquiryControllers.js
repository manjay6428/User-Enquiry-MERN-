const { enquiryModel } = require("../enquiryModel");

let enquiryCreate = (req, res) => {
  const { name, email, phone, role } = req.body;
  if (!name || !email || !phone || !role) {
    return res.send("Please enter all the fields");
  }
  const newUser = new enquiryModel({ name, email, phone, role });
  newUser
    .save()
    .then(() => {
      res.send({ status: 1, message: "User added successfully" });
    })
    .catch((err) => {
      res.send({ status: 0, message: "Error adding the user", err });
    });
};

let enquiryList = async (req, res) => {
  const userData = await enquiryModel.find();
  console.log(userData);
  res.status(200).json({ status: 1, data: userData });
};

let enquiryDelete = async (req, res) => {
  const { id } = req.params;
  const deleteEnquiry = await enquiryModel.deleteOne({ _id: id });
  console.log(deleteEnquiry);

  res.status(200).json({
    status: 1,
    message: "User deleted successfully",
    id,
    deleteEnquiry,
  });
};

let enquiryUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  const updateEnquiry = await enquiryModel.updateOne(
    { _id: id },
    { name, email, phone, role }
  );
  res.status(200).json({
    status: 1,
    message: "User Updated successfully",
    id,
    updateEnquiry,
  });
};

module.exports = { enquiryCreate, enquiryList, enquiryDelete, enquiryUpdate };
