import Fastify from "fastify";
import { appRoutes } from "./routes";

//instance of fastify
const app = Fastify();

// calls routes from appRoutes
app.register(appRoutes)

// init server listening on port 3333
app.listen({
  port: 3333
}).then(() => {
  console.log('running');
})
