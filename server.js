import server from "./index.js";
import env from "dotenv";
env.config();
import { connectToDb } from "./src/config/db.js";

server.listen(process.env.PORT || 8000, () => {
  console.log("Server listening at port 8000");
  connectToDb();
});
