import server from "./index.js";
import env from "dotenv";
env.config();

server.listen(process.env.PORT || 3000, () => {
  console.log("Server listening at port 3000");
});
