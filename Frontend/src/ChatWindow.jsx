import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";  // ✅ useRef add kiya
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId,
            setPrevChats, setNewChat, theme, toggleTheme } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);  // ✅ mic state
    const navigate = useNavigate();
    const recognitionRef = useRef(null);  // ✅ speech recognition ref

    // ✅ Voice Setup
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log("Browser voice support nahi karta");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";          // English
        recognition.continuous = false;       // Ek baar mein ek sentence
        recognition.interimResults = false;   // Final result hi chahiye

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setPrompt(transcript);            // ✅ Input mein text aa jayega
            setIsListening(false);
        };

        recognition.onerror = (e) => {
            console.log("Voice error:", e.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    // ✅ Mic button click
    const toggleVoice = () => {
        if (!recognitionRef.current) {
            alert("Tumhara browser voice support nahi karta!");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, options);
            const res = await response.json();
            setReply(res.reply);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => ([
                ...prevChats,
                { role: "user", content: prompt },
                { role: "assistant", content: reply }
            ]));
        }
        setPrompt("");
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="chatWindow">

            <div className="navbar">
                <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>

            {isOpen &&
                <div className="dropDown">
                    <div className="dropDownItem">
                        <i className="fa-solid fa-gear"></i> Settings
                    </div>
                    <div className="dropDownItem" onClick={toggleTheme}>
                        {theme === "dark"
                            ? <><i className="fa-solid fa-sun"></i> Light Mode</>
                            : <><i className="fa-solid fa-moon"></i> Dark Mode</>
                        }
                    </div>
                    <div className="dropDownItem">
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
                    </div>
                    <div className="dropDownItem" onClick={logout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            }

            <Chat />
            <ScaleLoader color="#fff" loading={loading} />

            <div className="chatInput">
                <div className="inputBox">
                    <input
                        placeholder={isListening ? "Bol raha hun... 🎤" : "Ask anything"}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    />

                    {/* ✅ Mic Button */}
                    <div
                        id="micBtn"
                        onClick={toggleVoice}
                        className={isListening ? "listening" : ""}
                    >
                        <i className={`fa-solid ${isListening ? "fa-stop" : "fa-microphone"}`}></i>
                    </div>

                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>

        </div>
    );
}

export default ChatWindow;