const mongoose = require("mongoose");
require("dotenv").config()
// Function to connect to the database
const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_URL)
    await mongoose.connect(process.env.MONGODB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
      serverSelectionTimeoutMS: 1000000, // Wait 30 seconds to select the server
      bufferCommands: true, // Buffer commands until the connection is re-established
    });

    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error);
    // Retry the connection after 5 seconds in case of failure
    setTimeout(connectDB, 5000);
  }
};

// Handle connection events to monitor connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
  // Optionally, retry connection here if needed
  setTimeout(connectDB, 5000);  // Retry connection after 5 seconds
});

mongoose.connection.on('reconnected', () => {
  console.log('Mongoose reconnected to MongoDB');
});  
  
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection errors: ${err}`);
});

// Gracefully shutdown the database connection on exit
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to application termination!');
  process.exit(0);
});

// Calling the function to start the connection
connectDB();

module.exports = connectDB;
