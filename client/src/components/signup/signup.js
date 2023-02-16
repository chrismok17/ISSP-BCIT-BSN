// import React, { useState, useContext} from "react";
// import "./signup.css";
// import { GlobalContext } from "../../context";


// export default function Signup() {
//     const context = useContext(GlobalContext);
    
//     const [email, setUserName] = useState();
//     const [password, setPassword] = useState();
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetch("http://localhost:8080/signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: email, password: password }),
//         })
//         .then((response) => {
//             if (response.status === 200) {
//             return response.json();
//             } else {
//             throw new Error("error when submitting data", { cause: response });
//             }
//         })
//         .then((data) => {
//             context.updateUserData(data.email, data.token, Boolean(data.isAdmin));
//             sessionStorage.setItem("token", JSON.stringify(data.token));
//         })
//         .catch((err) => {
//             console.error("handleSubmit", err);
//         });
//     };
    
//     return (
//         <>
//         <div className="signup-wrapper">
//             <h1>SIGN UP</h1>
//             <form className="form" onSubmit={handleSubmit}>
//             <label>
//                 <p>BCIT Email</p>
//                 <input type="text" onChange={(e) => setUserName(e.target.value)} />
//             </label>
//             <label>
//                 <p>Password</p>
//                 <input
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 />
//             </label>
//             <label>
//                 <p>Confirm Password</p>
//                 <input
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 />
//             </label>
//             <div className="submit-button">
//                 <button type="submit">SIGN UP</button>
//             </div>
//             <p class="mt-4">
//                 Already have an account?{" "}
//                 <a class="create-Link" href="/login">
//                 Sign In
//                 </a>
//             </p>
//             </form>
//         </div>
//         </>
//     );
//     }