// src/server.ts
import app from "./app";
import connectDB from "./config/db";
import env from "./util/validateEnv";

connectDB();

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
