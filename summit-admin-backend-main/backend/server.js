require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const mongodb = require("./db/mongodb");
const cookieParser = require("cookie-parser");

// server.js
const { initSockets } = require("./websockets/InitSockets");



const app = express(); 

// security
app.use(helmet());

// global error handler
app.use((err, req, res, next) => {
  console.error("❌ Uncaught error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});
 
// Create HTTP server
const server = http.createServer(app);

// Connect to database
mongodb();

// accept cookie request
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://summitinvestmentbank.vercel.app",
  "https://summit-backend-euew.onrender.com",
  "https://summit-bank-backend-1.onrender.com",
  "https://www.summitinvestmentglobal.com",
  "https://managesummitinvestment.vercel.app"
  
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// after creating HTTP server
initSockets(server, allowedOrigins);

// ================================
// IMPORT ROUTES
// ================================
const AdminConfigRoute = require("./routes/AdminConfigRoute/AdminConfigRoute")
const AdminRouter = require("./routes/adminRoute/adminRoute")
const WalletControllerRouter = require("./routes/WalletRoute/WalletRouter")



// ================================
// ROUTE MOUNTING
// ================================
app.use("/api/adminconfig",AdminConfigRoute)
app.use("/api/admin/wallet",WalletControllerRouter)
app.use("/api/admin",AdminRouter)
 


// ================================
// BASE ROUTE
// ================================
app.get("/", (req, res) => {
  res.send("Summit Investment Bank API is running...");
});

// ================================
// ERROR HANDLER
// ================================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});




const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});