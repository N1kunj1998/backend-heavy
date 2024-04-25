const http = require("http");

const server = http.createServer((req, res) => {
    if(req.url === "/about") {
        res.end("<h1>about page</h1>");
    } else if(req.url === "/") {
        res.end("<h1>Home Page</h1>");
    } else if(req.url === "/contact") {
        res.end("<h1>Contact Page</h1>");
    } else {
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(5001, () => {
    console.log("server is working");
})
