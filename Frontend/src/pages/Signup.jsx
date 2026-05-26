import "./Signup.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const res = await response.json();

            if (!response.ok) {
                setError(res.message);
                return;
            }

            // Signup ke baad login page pe bhejo
            navigate("/login");

        } catch (err) {
            setError("Something went wrong!");
        }
    };

    return (
        <div className="authPage">
            <div className="authBox">
                <h1>SigmaGPT</h1>
                <h2>Signup</h2>

                {error && <p className="errorMsg">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleSignup}>Signup</button>

                <p>Already have an account? <Link to="/login">Login </Link></p>
            </div>
        </div>
    );
}

export default Signup;