const http = require("http");

const PORT = process.env.PORT || 8080;

//Teste 2
function sendJSON(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function hello(req, res) {
  sendJSON(res, 200, { message: "Hello, World!" });
}

function healthy(req, res) {
  sendJSON(res, 200, { status: "healthy" });
}

const routes = {
  "/hello": hello,
  "/healthy": healthy,
};

const server = http.createServer((req, res) => {
  const handler = req.method === "GET" ? routes[req.url] : undefined;
  if (handler) {
    handler(req, res);
  } else {
    sendJSON(res, 404, { error: "not found" });
  }
});

if (require.main === module) {
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = { server };
