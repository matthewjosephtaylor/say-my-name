import { Command } from "commander";

export type SmnConfig = {
  dataPath: string;
};

export function createSmnConfig(): SmnConfig {
  // argv.usage("Usage: $0 --data-path").demandOption(["data-path"]);
  const program = new Command();
  program.option(
    "-dp, --data-path <path>",
    "data path used for resource storage", "data"
  );
  program.version("test");

  program.parse(process.argv);
  return {
    dataPath : program.dataPath
  }
}
