import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
username: "",
mobile: "",
email: "",
displayName: "",
role: "user",
password: ""
});

const handleChange = (e) => {

setFormData({
...formData,
[e.target.name]: e.target.value
});

};


const handleSubmit = async (e) => {

e.preventDefault();

try {

await axios.post(
"http://localhost:3000/users/register",
formData
);

alert("Registration Successful");
navigate("/login");
} catch (error) {
    console.log(error)

alert("Registration Failed");

}

};


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">

<h2 className="text-2xl font-bold text-center mb-6">
Register
</h2>


<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
name="username"
placeholder="Username"
value={formData.username}
onChange={handleChange}
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<input
type="text"
name="mobile"
placeholder="Mobile Number"
value={formData.mobile}
onChange={handleChange}
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<input
type="text"
name="displayName"
placeholder="Display Name"
value={formData.displayName}
onChange={handleChange}
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<select
name="role"
value={formData.role}
onChange={handleChange}
className="w-full border p-2 rounded-lg"
>

<option value="user">user</option>
<option value="teacher">Teacher</option>
<option value="admin">Admin</option>

</select>


<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<button
type="submit"
className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
>

Register

</button>


</form>

</div>

</div>

);

}

export default Register;