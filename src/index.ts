import { build } from './app';

const app = build();

app.listen({ host: '0.0.0.0', port: Number(process.env.PORT) || 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(app.printRoutes());
});
