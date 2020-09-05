import express, { RequestHandler } from "express";
import { SmnRuntime } from "runtime/SmnRuntime";
import { NameRecord, DomainName } from "dns/NameRecords";
import { storeRecords, deleteRecords } from "db/NameDb";
import {
  getProjectVersion,
  getProjectPackage,
  getBuildTimeIso,
} from "project/ProjectGlobals";

import { Response } from "express-serve-static-core";
import { toMany } from "object/Objects";

type RuntimeRequestHandler = (runtime: SmnRuntime) => RequestHandler;

enum Route {
  "root" = "/",
  "shutdown" = "/shutdown",
  "version" = "/version",
  "info" = "/info",
  "build" = "/build",
  "record" = "/record",
  "name" = "/name/:domainName",
}

enum Method {
  get = "get",
  put = "put",
  post = "post",
  delete = "delete",
}

export function startRecordsService(runtime: SmnRuntime): Promise<number> {
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
/**
 * @api {get} / Hello
 */
const getHello: RuntimeRequestHandler = (runtime) => {
  return (request, response) => {
    const prj = getProjectPackage();
    response.send(`${prj.name} ${prj.version} ${prj.description}`);
  };
};

/**
 * @api {get} /version Version
 * @apiSuccess (200) {string} version  Version
 * @apiSuccessExample {string} Success-Response:
 * "1.0.0"
 *
 */
const getAppVersion: RuntimeRequestHandler = (runtime) => {
  return (request, response) => {
    response.send(getProjectVersion());
  };
};

const getAppInfo: RuntimeRequestHandler = (runtime) => {
  return (request, response) => {
    response.send(getProjectPackage());
  };
};

const getAppBuild: RuntimeRequestHandler = (runtime) => {
  return (request, response) => {
    response.send(getBuildTimeIso());
  };
};

const setRecord: RuntimeRequestHandler = (runtime) => {
  return async (request, response) => {
    const resourceRecords: NameRecord | NameRecord[] = request.body;
    sendResult(response, storeRecords(runtime, toMany(resourceRecords)));
  };
};

const deleteName: RuntimeRequestHandler = (runtime) => {
  return async (request, response) => {
    const domainName: DomainName = request.params.domainName;
    sendResult(response, deleteRecords(runtime, domainName));
  };
};

/** @ */
const ROUTE_TABLE: [Method, Route, RuntimeRequestHandler][] = [
  [Method.get, Route.root, getHello],
  [Method.get, Route.version, getAppVersion],
  [Method.get, Route.info, getAppInfo],
  [Method.get, Route.build, getAppBuild],
  [Method.post, Route.record, setRecord],
  [Method.delete, Route.name, deleteName],
];

async function sendResult(
  response: Response,
  promise: Promise<any>
): Promise<void> {
  await promise
    .then((value) => {
      if (value === undefined) {
        value = "OK";
      }
      response.status(200).send(value);
    })
    .catch((reason) => response.status(500).send(reason));
}
