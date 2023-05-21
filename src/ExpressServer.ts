import express from "express";
import logger from "@n-loggers/logger";
import errorMiddleware from "./middlewares/errorMiddleware";
// import session from 'express-session';
import mongoDB from "@n-configs/mongo";
import router from "@n-routes";

export default class ExpressServer {
  private app: express.Application;
  private readonly port: number;

  constructor(port = Number(process.env.PORT)) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // this.app.use(morgan("tiny"));
    // this.app.use(cors());
    this.app.use(express.static("public"));
  }

  private async initializeRoutes() {
    this.app.get(
      "/ping",
      function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) {
        res.status(200);
        res.json({ message: "pong" });
      }
    );
    this.app.use('/scripts', express.static(__dirname + "/node_modules/web3.js-browser/build/"))
    this.app.set("view engine", "ejs");
    this.app.set("views", "public");
    this.app.get("/", (req, res) => {
      res.render("layout")
    });


    // this.app.use(session({
    //   name: "taro-mongo",
    //   store: mongoDB,
    //   secret: "taro-secret-mongo"
    // }))

    this.app.use("/v1", router)

    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(404);
      res.json({ message: "404 Not found" });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public start() {
    const server = this.app.listen(this.port, () => {
      logger.info(`Server express listen at ${JSON.stringify(server.address())}`)
    });
  }
}
