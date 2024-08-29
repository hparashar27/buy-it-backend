require('dotenv').config();
const app = require('./index');
const connectDB  = require("./config/db");

const PORT = 5453;

app.listen(PORT, async () => {
    console.log("Starting server...");
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
    console.log("App is listening on the port", PORT);
});
