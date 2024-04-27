import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend",
})
.then(() => {console.log("Database Connected")})
.catch((e) => console.error(e));

// Defining Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

const app = express();

const users = [];

// express.static is a middleware so it cannot be used directly we need to use app.use()
// while linking some files like css or js if the file is not found in current location then 
// it will also be searched in this public folder because we have made it static
app.use(express.static(path.join(path.resolve(),"./public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// setting up View Engine
app.set("view engine", "ejs")

const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(token) {
        const decoded = jwt.verify(token, "adsflakjdfgal");
        // console.log(decoded);
        req.user = await User.findById(decoded._id);
        next();
    } else {
        res.redirect("/login");
    }
}

app.get("/", isAuthenticated , (req, res) => {
    // console.log(req.user);
    res.render("logout", {name: req.user.name});
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({email});
    if(!user) return res.redirect("/register");

    const isMatch = user.password === password;

    if(!isMatch) return res.render("login", {email, message: "Incorrect Password"});

    const token = jwt.sign({_id: user._id}, "adsflakjdfgal");

    res.cookie("token", token, {
        httpOnly: true, // it is good to keep this true
        expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
})

app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});
    console.log(!user);
    if(user != null) {
        return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({_id: user._id}, "adsflakjdfgal");

    res.cookie("token", token, {
        httpOnly: true, // it is good to keep this true
        expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
})


app.listen(5001, () => {
    console.log(`server listening at port 5001`);
})