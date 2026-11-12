require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT,()=> {
            console.log(`Server listening at ${PORT}`);
        });

    } catch (error) {
        console.error("Startup error:", error.message);
        process.exit(1);
    }
};

startServer();


