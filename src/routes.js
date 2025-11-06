export const routes = [
  {
    method: "GET",
    url: "/",
    handler: (req, res) => {
      res.end("Hello World");
    },
  },
];
