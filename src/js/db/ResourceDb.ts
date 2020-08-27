import { Resource } from "dns2";
import { SmnRuntime } from "runtime/SmnRuntime";

import oldFs from "fs";
import { WriteFileOptions } from "fs";
const fs = oldFs.promises;

type Path = string;
// https://stackoverflow.com/a/106223/5306554
const VALID_NAME_REGEX: RegExp = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

export async function storeResources(
  runtime: SmnRuntime,
  resources: Resource[]
): Promise<void> {
  const resourceName = resourcesToName(resources);
  const path = nameToPath(runtime, resourceName);
  const data = JSON.stringify(resources);
  const options: WriteFileOptions = {
    encoding: "utf8",
    mode: 0o666,
    flag: "w",
  };
  return fs.writeFile(path, data, options);
}

function resourcesToName(resources: Resource[]): string {
  if (resources === undefined || resources.length < 1) {
    return undefined;
  }
  return resources[0].name;
}

export async function retrieveResources(
  runtime: SmnRuntime,
  resourceName: string
): Promise<Resource[]> {
  const path = nameToPath(runtime, resourceName);
  return fs.readFile(path, "utf8").then((data) => {
    return JSON.parse(data);
  });
}

function nameToPath(runtime: SmnRuntime, resourceName: string): Path {
  if (resourceName === undefined || !VALID_NAME_REGEX.test(resourceName)) {
    throw (
      "Invalid name. Name: '" +
      resourceName +
      "' does not match regex: '" +
      VALID_NAME_REGEX +
      "'"
    );
  }
  return runtime.config.dataPath + "/" + resourceName;
}
