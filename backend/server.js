import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.db = router.db;

server.use(jsonServer.defaults());
server.use(auth);
server.use(router);

// مهم: پورت داینامیک
const PORT = import.meta.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
