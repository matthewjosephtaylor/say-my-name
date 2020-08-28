import express from "express";
import { SmnRuntime } from "runtime/SmnRuntime";

export function startNameDatabaseServer(runtime: SmnRuntime): Promise<number> {
  // const server = DNS.createServer(serveRequest);
  // listenToRequests(server);
  // server.listen(5333);
  const app = express();
  // const port = "8080";
  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.listen(runtime.config.updatePort);
  return new Promise((resolve, reject) => {
    // TODO quiesce
  });
}
