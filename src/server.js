import http from "node:http";
import { routes } from "./routes.js";

const server = http.createServer((req, res) => {
  routes.find((route) => {
    if (route.method === req.method && route.url === req.url) {
      return route.handler(req, res);
    }
  });
});

server.listen(3333, () => {
  console.log("Rodando em http://localhost:3333");
});
