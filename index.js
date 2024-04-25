// const http = require("http");
import http from "http";
// const name = require("./feature");
import myName from "./feature.js"
import { name2, name1 } from "./feature.js";
import * as myObj from "./feature.js"; // now everything from feature.js file will be accessed using this object.
import fs from "fs";
import path from "path";

// console.log(path);

const home = fs.readFileSync("./index.html", () => {
    console.log("file read");
})

console.log(myName);
console.log(myObj.name3);
console.log(myObj.generateLovePercent())

const server = http.createServer((req, res) => {
    console.log(req.method);
    if(req.url === "/about") {
        res.end(`<h1>Love is ${myObj.generateLovePercent()}</h1>`);
    } else if(req.url === "/") {
        res.end(home);
    } else if(req.url === "/contact") {
        res.end("<h1>Contact Page</h1>");
    } else {
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(5001, () => {
    console.log("server is working");
})
