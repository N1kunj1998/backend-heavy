import express from "express";
import mongoose from "mongoose";

const app = express();

// Using Midddleware
app.use(express.json())

mongoose
.connect("mongodb://localhost:27017", {
    dbName: "backend",
})
.then(() => console.log("Database connected"))
.catch((e) => console.error(e));

app.get("/", (req, res) => {
    res.send("Nice working");
});

const userScheme = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userScheme);

app.get("/users/all", async (req, res) => {
    const users = await User.find({});
    
    res.json({
        success: true,
        users,
    });
});

app.post("/users/new", async (req, res) => {
    const {name, email, password} = req.body;
    const users = await User.create({
        name,
        email,
        password
    });
    
    res.status(201).json({
        success: true,
        message: "Registered Successfully",
    });
});

app.get("/userid/special", (req, res) => {
    res.json({
        success: true,
        message: "Just Joking",
    })
})

// Since this is dynamic route we should try to keep it below all routes so that it won't 
// coinside with existing routes
app.get("/userid/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        user
    });
})

app.listen(4000, () => {
    console.log("Server is working")
});