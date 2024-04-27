import express from "express";
import path from "path";

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

app.post("/contact", (req, res) => {
    console.log(req.body);
    users.push({username: req.body.name, email: req.body.email});
    res.redirect("/success");
})

app.listen(5001, () => {
    console.log(`server listening at port 5001`);
})