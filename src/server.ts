import expressApp from "./expressApp";
import { logger } from "./utils";

// const PORT = process.env.PORT || 8000;
const PORT = process.env.PORT || 9001;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    // console.log(`App is listening to ${PORT}`);
    logger.info(`App is listening to ${PORT}`);
  });
  // If Express app is not responding when starting app
  process.on("uncaughtException", async (err) => {
    // console.log(err)
    logger.error(err);
    process.exit(1);
  });
};
StartServer().then(() => {
  // console.log("Server is up!")
  logger.info("catalog_service server is up");
});