import { startNameQueryService } from "./server/NameQueryService";
import { SmnRuntime, createSmnRuntime } from "runtime/SmnRuntime";
import DNS, { ResourceA, Resource } from "dns2";
import { storeResources, retrieveResources } from "db/ResourceDb";
import { createSmnConfig } from "runtime/SmnConfig";
import { runTest } from "test/Tests";
import { startNameDatabaseService } from "server/NameDatabaseService";

//@ts-ignore
console.log("Say My Name v" + VERSION);

async function main(): Promise<number> {
  const config = createSmnConfig();
  console.log("Configuration: ", config);
  const runtime: SmnRuntime = createSmnRuntime(config);
  if (config.test !== undefined) {
    return (await runTest(runtime, config.test)) ? 0 : 1;
  }

  return Promise.race([
    startNameQueryService(runtime),
    startNameDatabaseService(runtime),
  ]);
}

main().then((exitCode) => {
  exitCode === 0
    ? console.log("Normal program termination")
    : console.log("Unexpected program termination, exit code:", exitCode);
  process.exit(exitCode);
});
