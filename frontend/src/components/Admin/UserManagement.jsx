import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../redux/slices/adminSlice";
import { deleteUser } from "../../redux/slices/adminSlice";
import { addUser } from "../../redux/slices/adminSlice";
import { updateUser } from "../../redux/slices/adminSlice";

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);
    const {users, loading, error} = useSelector((state) => state.admin)

    useEffect(() => {
        if(user && user.role !== "admin"){
            navigate("/");
        }
       }, [user, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    useEffect(() => {
        if(user && user.role === "admin"){
            dispatch(fetchUsers());
        }
    }, [dispatch, user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));

        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        });
    };

    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({id : userId, role : newRole}));
    };

    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure?")){
            dispatch(deleteUser(userId));
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error}</p>}
            <div className="p-6 rounded-corners mb-6">
                <h3 className="text-lg bont-bold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add User</button>
                </form>
            </div>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xl uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
    users.map((user) =>
      user ? (
        <tr key={user._id} className="border-b hover:bg-gray-50">
          <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
          <td className="p-4">{user.email}</td>
          <td className="p-4">
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
              className="p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </td>
          <td className="p-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ) : null
    )
  ) : (
    <tr>
      <td className="p-4" colSpan={4}>
        No users found.
      </td>
    </tr>
  )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default UserManagement;