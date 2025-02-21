import { useEffect, useRef, useState } from "react";
import "./App.css";
import UserEnquiryForm from "./components/userEnquiryForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [users, setUsers] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState("");
  const inputRef = useRef();
  const baseUrl = "http://localhost:5002/api/enquiry";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/enquiry-get`);
      console.log(res);

      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateClicked = (id) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setUpdate(true);
    setIdToUpdate(id);
    const user = users.find((item) => item._id === id);
    const { name, email, phone, role } = user;
    setFormData({ name, email, phone, role });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${baseUrl}/enquiry/${id}`, formData);
      console.log(res);
      toast(res.data.message, { autoClose: 3000 });
      fetchUsers();
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
      });
      setUpdate(false);
    } catch (err) {
      console.log(err);
      toast(err, { autoClose: 3000 });
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/enquiry/${id}`);
      toast("User removed successfully!", { autoClose: 3000 });
      fetchUsers();
    } catch (err) {
      console.log(err);
      toast(err, { autoClose: 3000 });
    }
  };
  return (
    <div className="flex gap-6 p-6">
      <UserEnquiryForm
        fetchUsers={fetchUsers}
        isUpdate={isUpdate}
        formData={formData}
        setFormData={setFormData}
        handleUpdate={handleUpdate}
        idToUpdate={idToUpdate}
        inputRef={inputRef}
      />
      <div className="p-4">
        <div className="border border-gray-300 rounded-lg overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[1.5fr_2fr_1fr_1.5fr_1.5fr] bg-gray-200 p-2 font-semibold">
            <div className="p-2">Name</div>
            <div className="p-2">Email</div>
            <div className="p-2">Phone</div>
            <div className="p-2">Role</div>
            <div className="p-2 text-center">Actions</div>
          </div>

          {/* Table Body */}
          {users.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.5fr_2fr_1fr_1.5fr_1.5fr] border-t border-gray-300 p-2 items-center"
            >
              <div className="p-2 truncate">{user.name}</div>
              <div className="p-2 break-words">{user.email}</div>
              <div className="p-2">{user.phone}</div>
              <div className="p-2 truncate">{user.role}</div>

              {/* Action Buttons */}
              <div className="p-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => updateClicked(user._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
