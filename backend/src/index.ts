import { buildApp } from './app';

const app = buildApp();

const start = async () => {
  try {
    await app.ready();
    await app.listen({ port: app.config.PORT, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
