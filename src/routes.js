import { randomUUID } from "node:crypto";
import { Database } from "./databse.js";
import { buildRoutePath } from "./utils/build-route-path.js";
const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/"),
    handler: (req, res) => {
      res.end("Hello World");
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);
      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.query;
      const tasks = database.select(
        "tasks",
        title ? { title } : description ? { description } : null
      );
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      const tasks = database.select("tasks", { id });
      if (!tasks || tasks.length === 0) {
        return res.writeHead(404).end();
      }
      const task = tasks[0];
      const dataToUpdate = {
        ...task,
        updated_at: new Date().toISOString(),
      };
      if (title) dataToUpdate.title = title;
      if (description) dataToUpdate.description = description;
      database.update("tasks", id, dataToUpdate);
      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.select("tasks", { id })[0];
      if (!task) {
        return res.writeHead(404).end();
      }
      database.delete("tasks", id);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.select("tasks", { id })[0];
      if (!task) {
        return res.writeHead(404).end();
      }
      database.update("tasks", id, {
        ...task,
        completed_at: new Date().toISOString(),
      });
      return res.writeHead(204).end();
    },
  },
];
