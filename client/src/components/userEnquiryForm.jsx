import axios from "axios";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const UserEnquiryForm = ({
  fetchUsers,
  isUpdate,
  formData,
  setFormData,
  handleUpdate,
  idToUpdate,
  inputRef,
}) => {
  const baseUrl = "http://localhost:5002/api/enquiry";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      handleUpdate(idToUpdate);
      return;
    }
    try {
      await axios.post(`${baseUrl}/enquiry-create`, formData);
      fetchUsers();
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
      });
      toast("User added successfully!", { autoClose: 3000 });
    } catch (err) {
      console.log(err);

      toast(err, { autoClose: 3000 });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">User Enquiry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          ref={inputRef}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone No"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isUpdate ? "Update" : "Submit"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserEnquiryForm;
