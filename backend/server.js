import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(jsonServer.defaults());
server.use(router);

const PORT = import.meta.env.PORT || 3000;

server.listen(PORT);
