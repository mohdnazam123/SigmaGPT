import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://sigmagpt-1-tvpi.onrender.com" 
]
    methods: ["GET", "POST", "DELETE"],
    credentials: false  
}));

app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);


app.get("/ping", (req, res) => res.send("pong"));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.log("Failed to connect with Db", err);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);

        
        setInterval(async () => {
            try {
                await fetch(`https://sigmagpt-hvyh.onrender.com/ping`);
                console.log("Server pinged!");
            } catch(err) {}
        }, 14 * 60 * 1000);
    });
});