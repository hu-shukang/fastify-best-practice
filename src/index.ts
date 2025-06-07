import { build } from './app';
import 'reflect-metadata';

const app = build();

app.listen({ host: '0.0.0.0', port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(app.printRoutes());
});
