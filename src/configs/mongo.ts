import { ConnectionOptions, connect } from "mongoose";
import MongoStore from 'connect-mongo';
const FULL_CONNECT = process.env.MONGO_FULL_CONNECT ? process.env.MONGO_FULL_CONNECT : `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const mongoURI: string = FULL_CONNECT;
const options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
let mongoDB: any;
export async function checkMongoConnection() {
  console.log(mongoURI);
  await connect(mongoURI, options);
  mongoDB = MongoStore.create({ mongoUrl: mongoURI })
  console.log("MongoDB Connected ... ");
}
// (async () => {
//   checkMongoConnection();
// })
export default mongoDB;
