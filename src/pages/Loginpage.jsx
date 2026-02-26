import { useState } from "react";
import { setAccessToken } from "../utils/tokens.js";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const logInUser = async (event) => {

event.preventDefault();

try {

const options = {
method: "POST",
body: JSON.stringify({
username,
password
}),
headers: {
"Content-Type": "application/json"
},
credentials: "include"
};

const response = await fetch(
`${import.meta.env.VITE_API_BASE_URL}/users/login`,
options
);

const jsonData = await response.json();

setAccessToken(jsonData.accessToken);

navigate("/");

} catch (error) {

console.error(error);

}

};


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">

<h2 className="text-2xl font-bold text-center mb-6">
Login
</h2>


<form onSubmit={logInUser} className="space-y-4">

<input
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
type="text"
required
/>


<input
className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
type="password"
required
/>


<button
className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
type="submit"
>

Login

</button>


</form>


<p className="text-center mt-4 text-sm">

Don't have an account?

<span
onClick={()=>navigate("/register")}
className="text-blue-600 cursor-pointer ml-1"
>

Register

</span>

</p>


</div>

</div>

);

};

export default LogInPage;