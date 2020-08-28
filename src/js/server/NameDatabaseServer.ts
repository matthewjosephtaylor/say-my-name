import express, { RequestHandler } from "express";
import { SmnRuntime } from "runtime/SmnRuntime";
import { ResourceRecord } from "dns/ResourceRecords";
import { storeResources } from "db/ResourceDb";

enum Route {
  "root" = "/",
  "shutdown" = "/shutdown",
  "version" = "/version",
  "record" = "/record",
}

enum Method {
  get = "get",
  put = "put",
  post = "post",
  delete = "delete",
}

export function startNameDatabaseServer(runtime: SmnRuntime): Promise<number> {
  const app = setupRoutes(runtime);
  app.listen(runtime.config.updatePort);
  return new Promise((resolve, reject) => {
    app.get(Route.shutdown, (request, response) => {
      console.log("shutdown requested");
      response.send("goodbye");
      resolve(0);
    });
  });
}

function setupRoutes(runtime: SmnRuntime) {
  const app = express();
  app.use(express.json()); // parse application/json
  ROUTE_TABLE.forEach((entry) => {
    const [method, route, runtimeRouteHandler] = entry;
    const routeHandler = runtimeRouteHandler(runtime);
    app[method](route, routeHandler);
  });
  return app;
}

type RuntimeRequestHandler = (runtime: SmnRuntime) => RequestHandler;

const getVersion: RuntimeRequestHandler = (runtime) => {
  return (request, response) => {
    //@ts-ignore
    response.send("Say My Name v" + VERSION);
  };
};

function toMany<T>(obj: T | T[]): T[] {
  return obj instanceof Array ? obj : [obj];
}

const setRecord: RuntimeRequestHandler = (runtime) => {
  return (request, response) => {
    const resourceRecords: ResourceRecord | ResourceRecord[] = request.body;
    console.log("setting", resourceRecords);
    storeResources(runtime, toMany(resourceRecords));
    response.sendStatus(200);
  };
};

const ROUTE_TABLE: [Method, Route, RuntimeRequestHandler][] = [
  [Method.get, Route.root, getVersion],
  [Method.get, Route.version, getVersion],
  [Method.post, Route.record, setRecord],
];
