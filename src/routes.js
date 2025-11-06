import { buildRoutePath } from "./utils/build-route-path.js";

export const routes = [
  {
    method: "GET",
    url: buildRoutePath("/"),
    handler: (req, res) => {
      res.end("Hello World");
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {},
  },
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {},
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {},
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {},
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {},
  },
];
