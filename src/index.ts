if (process.env.ENV_JS) {
  require('module-alias/register')
}

import "reflect-metadata";
import ExpressServer from "./ExpressServer";
import { checkMongoConnection } from "@n-configs/mongo";


async function bootstrap() {
  await checkMongoConnection();
}

function init() {
  const expressServer = new ExpressServer();
  expressServer.start();
}

bootstrap().then(() => {
  init();
});
