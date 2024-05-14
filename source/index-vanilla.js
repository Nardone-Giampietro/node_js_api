const http = require("http");

const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === ("/")) {
        res.statusCode = 200
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});