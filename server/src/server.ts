import Fastify from "fastify";

const app = Fastify();

app.get('/', () => {
  return "teste asdas"
})

app.listen({
  port: 3333
}).then(() => {
  console.log('running');
})
