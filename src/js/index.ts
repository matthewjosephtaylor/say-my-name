/**
 * Main entry point

 * @packageDocumentation
 * @module Main
 * @preferred
 */

import { startDomainNameService } from "./services/DomainNameService";
import { SmnRuntime, createSmnRuntime } from "runtime/SmnRuntime";
import { createSmnConfig } from "runtime/SmnConfig";
import { runTest } from "test/Tests";
import { startRecordsService } from "services/RecordsService";
import { getBuildTimeIso, getProjectPackage } from "project/ProjectGlobals";
import { setupRootCa } from "cert/RootCertificates";

const projectPackage = getProjectPackage();

// system error codes
export const ERROR_EXIT_CODE = 1;
export const SUCCESS_EXIT_CODE = 0;

export type ExitCode = number;

async function main(): Promise<ExitCode> {
  console.log(
    `${projectPackage.name} v${projectPackage.version} ${getBuildTimeIso()}`
  );
  const config = createSmnConfig();
  console.log("Configuration: ", config);
  const runtime: SmnRuntime = createSmnRuntime(config);

  if (config.test !== undefined) {
    return (await runTest(runtime, config.test))
      ? SUCCESS_EXIT_CODE
      : ERROR_EXIT_CODE;
  }

  const haveGoodRootCa = await setupRootCa(runtime).catch((reason) => {
    console.error(reason);
    return ERROR_EXIT_CODE;
  });
  if (haveGoodRootCa) {
    return startServices(runtime);
  } else {
    console.log("Problem with root CA. Unable to continue");
    return ERROR_EXIT_CODE;
  }
}

export async function startServices(runtime: SmnRuntime): Promise<ExitCode> {
  return Promise.race([
    startDomainNameService(runtime),
    startRecordsService(runtime),
  ]);
}

main().then((exitCode: ExitCode) => {
  exitCode === SUCCESS_EXIT_CODE
    ? console.log("Normal program termination")
    : console.log("Unexpected program termination, exit code:", exitCode);
  process.exit(exitCode);
});
