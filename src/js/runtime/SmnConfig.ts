import { Command } from "commander";

export type SmnConfig = {
  dataPath: string;
  test: string;
};

export function createSmnConfig(): SmnConfig {
  const program = new Command();
  program.option(
    "-dp, --data-path <path>",
    "data path used for resource storage",
    "data"
  );
  program.option(
    "-t, --test <test-name>",
    "run test (Warning: some tests are destructive, use with caution)"
  );
  // @ts-ignore see webpack.config.js for definition
  program.version(VERSION);

  program.parse(process.argv);
  return {
    dataPath: program.dataPath,
    test: program.test,
  };
}
