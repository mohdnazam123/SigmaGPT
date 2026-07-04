import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Sidebar */}
      <div className="landing-sidebar">
        <div className="sidebar-logo">
          <span className="logo-dot"></span> SigmaGPT
        </div>
        <div className="sidebar-item active">+ New chat</div>
        <div className="sidebar-item">Search chats</div>
        <div className="sidebar-item">Images</div>
      </div>

      {/* Main area */}
      <div className="landing-main">
        <div className="landing-topbar">
          <span className="landing-logo-mobile">
            <span className="logo-dot"></span> SigmaGPT
          </span>
          <div className="landing-auth-buttons">
            <button className="btn-login" onClick={() => navigate("/login")}>
              Log in
            </button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              Sign up for free
            </button>
          </div>
        </div>

        <div className="landing-center">
          <h1>What's on the agenda today?</h1>
          <div className="landing-input" onClick={() => navigate("/login")}>
            <span>+</span>
            <input type="text" placeholder="Ask anything" readOnly />
          </div>

          <div className="landing-suggestions">
            <div onClick={() => navigate("/login")}>💡 Make this email professional</div>
            <div onClick={() => navigate("/login")}>❓ What is buri nazar?</div>
            <div onClick={() => navigate("/login")}>❓ How can I save more money?</div>
          </div>
        </div>

        <p className="landing-footer">
          SigmaGPT is AI. By using it, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Landing;