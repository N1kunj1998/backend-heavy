import express from "express";
import path from "path";

// As per industry standards instead of name of the server server we keep it as app
const app = express();

app.get("/", (req, res) => {
    // res.statusCode(404);
    
    // res.send("hi");
    
    // res.json({
    //     success: true,
    //     products: []
    // })
    
    // res.status(400).send("meri marzi");

    // Sending html file as response
    // console.log(path.resolve())
    const pathLocation = path.resolve();
    // res.sendFile(path.join(pathLocation, "./index.html"));
    res.render()
})

app.listen(5001, () => {
    console.log(`server listening at port 5001`);
})