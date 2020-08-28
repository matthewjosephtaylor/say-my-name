import { startDomainNameService } from "./services/DomainNameService";
import { SmnRuntime, createSmnRuntime } from "runtime/SmnRuntime";
import DNS, { ResourceA, Resource } from "dns2";
import { storeRecords, retrieveRecords } from "db/NameDb";
import { createSmnConfig } from "runtime/SmnConfig";
import { runTest } from "test/Tests";
import { startRecordsService } from "services/RecordsService";
import { getBuildTimeIso, getProjectPackage } from "project/ProjectGlobals";

const projectPackage = getProjectPackage();
console.log(
  `${projectPackage.name} v${projectPackage.version} ${getBuildTimeIso()}`
);

async function main(): Promise<number> {
  const config = createSmnConfig();
  console.log("Configuration: ", config);
  const runtime: SmnRuntime = createSmnRuntime(config);
  if (config.test !== undefined) {
    return (await runTest(runtime, config.test)) ? 0 : 1;
  }
  return startServices(runtime);
}

export async function startServices(runtime: SmnRuntime): Promise<number> {
  return Promise.race([
    startDomainNameService(runtime),
    startRecordsService(runtime),
  ]);
}

main().then((exitCode) => {
  exitCode === 0
    ? console.log("Normal program termination")
    : console.log("Unexpected program termination, exit code:", exitCode);
  process.exit(exitCode);
});
