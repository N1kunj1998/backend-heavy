import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend",
})
.then(() => {console.log("Database Connected")})
.catch((e) => console.error(e));

// Defining Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Message = mongoose.model("Message", messageSchema);

const app = express();

const users = [];

// express.static is a middleware so it cannot be used directly we need to use app.use()
// while linking some files like css or js if the file is not found in current location then 
// it will also be searched in this public folder because we have made it static
app.use(express.static(path.join(path.resolve(),"./public")));

app.use(express.urlencoded({extended:true}));

// setting up View Engine
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index.ejs", {name: "nikunj"});
})

app.get("/success", (req, res) => {
    res.render("success.ejs");
})

app.get("/users", (req, res) => {
    res.json({users});
})

app.post("/contact", async (req, res) => {
    const {name, email} = req.body;
    await Message.create({name, email});
    res.redirect("/success");
})

app.listen(5001, () => {
    console.log(`server listening at port 5001`);
})