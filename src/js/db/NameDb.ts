import { SmnRuntime } from "runtime/SmnRuntime";

import oldFs from "fs";
import { WriteFileOptions } from "fs";
import { NameRecord, DomainName } from "dns/NameRecords";
const fs = oldFs.promises;

const RECORDS_DIR = "records";
const TRASH_DIR = "trash";
type Filepath = string;
// https://stackoverflow.com/a/106223/5306554
const VALID_NAME_REGEX: RegExp = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

export async function deleteRecords(
  runtime: SmnRuntime,
  domainName: string
): Promise<void> {
  const path = await nameToRecordsPath(runtime, domainName);
  const trashPath = await nameToTrashPath(runtime, domainName);
  if (path === undefined || trashPath === undefined) {
    return Promise.reject(`No path for domainName: ${domainName}`);
  }
  return fs.rename(path, trashPath);
}

export async function storeRecords(
  runtime: SmnRuntime,
  resources: NameRecord[]
): Promise<void> {
  const domainName = recordsToDomainName(resources);
  const path = await nameToRecordsPath(runtime, domainName);
  if (path === undefined) {
    return Promise.reject(`No path for domainName: ${domainName}`);
  }
  const data = JSON.stringify(resources);
  const options: WriteFileOptions = {
    encoding: "utf8",
    mode: 0o666,
    flag: "w",
  };
  return fs.writeFile(path, data, options);
}

export async function retrieveRecords(
  runtime: SmnRuntime,
  domainName: DomainName
): Promise<NameRecord[]> {
  const path = await nameToRecordsPath(runtime, domainName);
  if (path === undefined) {
    return Promise.reject(`No path for domainName: ${domainName}`);
  }
  return fs
    .readFile(path, "utf8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((reason) => {
      // TODO better todo a stat rather than failing?
      return undefined; // expect that most records will not exist
    });
}

function recordsToDomainName(resources: NameRecord[]): DomainName {
  if (resources === undefined || resources.length < 1) {
    return undefined;
  }
  return resources[0].name;
}

function isInvalidDomainName(domainName: DomainName): boolean {
  if (domainName === undefined || !VALID_NAME_REGEX.test(domainName)) {
    return true;
  }
  return false;
}

async function nameToRecordsPath(
  runtime: SmnRuntime,
  domainName: DomainName
): Promise<Filepath> {
  if (isInvalidDomainName(domainName)) {
    return undefined;
  }
  const targetDirectory = await getTargetDirectory(runtime, RECORDS_DIR);
  return targetDirectory + "/" + domainName;
}

async function getTargetDirectory(runtime: SmnRuntime, pathExtension: string) {
  const targetDirectory = [runtime.config.dataPath, pathExtension].join("/");
  await fs.mkdir(targetDirectory, {
    recursive: true,
  });
  return targetDirectory;
}

async function nameToTrashPath(
  runtime: SmnRuntime,
  domainName: string
): Promise<Filepath> {
  if (isInvalidDomainName(domainName)) {
    return undefined;
  }
  const targetDirectory = await getTargetDirectory(runtime, TRASH_DIR);
  const time = new Date().getTime();
  return targetDirectory + "/" + domainName + "." + time;
}
