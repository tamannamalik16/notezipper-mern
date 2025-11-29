const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const path = require("path");

const app = express();
dotenv.config(); //to use .env file

connectDb();

app.use(express.json());

app.use("/api/users", userRoutes); //routes for user related operations
app.use("/api/notes", noteRoutes); //routes for note related operations

// ----------------------DEPLOYMENT----------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully..");
  });
}

//error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is listening on port ${PORT}`));
