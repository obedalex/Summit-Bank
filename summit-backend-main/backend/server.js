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
  "https://www.summitinvestmentglobal.com"
  
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
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// after creating HTTP server
initSockets(server, allowedOrigins);

// ================================
// IMPORT ROUTES
// ================================
const authRoutes = require("./routes/authRoute/authRoute");
const userRoutes = require("./routes/userRoute/UserRoute");
const walletRoutes = require("./routes/walletRoute/walletRoute");
const transactionRoutes = require("./routes/transactionRoute/transactionRoute");
const investmentPlanRoutes = require("./routes/investPlanRoute/investPlanRoute");
const investmentRoutes = require("./routes/investmentRoute/investmentRoute");
const kycRoutes = require("./routes/KycRoute/kycRoute");
const notificationRoutes = require("./routes/NotificationRoute/notificationRoute");
const adminRoutes = require("./routes/adminRoute/adminRoute");
const adminKycRoutes = require("./routes/adminKycRoute/adminKycRoute");
const userDashboardRoutes = require("./routes/userDashboardRoutes/userDashboardRoute");
const pinRoutes = require("./routes/pinRoute/pinRoute");
const cardRoutes = require("./routes/cardRoute/CardRoute")
const bankRoute = require("./routes/bankRoute/bankRoute")
const bankListRoute = require("./routes/bankListRoute/bankListRoute")

// ================================
// ROUTE MOUNTING
// ================================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/plan", investmentPlanRoutes);
app.use("/api/investment", investmentRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin/kyc", adminKycRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userDashboardRoutes);
app.use("/api/user", pinRoutes);
app.use("/api/banks", bankRoute);
app.use("/api/bankList", bankListRoute);
 


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