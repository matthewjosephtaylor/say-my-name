import { Command } from "commander";

export type SmnConfig = {
  dataPath: string;
  test: string;
  queryPort: number;
  updatePort: number;
};

export function createSmnConfig(): SmnConfig {
  const program = new Command();
  // @ts-ignore see webpack.config.js for definition
  program.version(VERSION);

  program.option(
    "-dp, --data-path <path>",
    "data path used for resource storage",
    "data"
  );
  program.option(
    "-t, --test <test-name> | all",
    "run test (Warning: some tests are destructive, use with caution)",
  );
  program.option(
    "-qp, --query-port <port-number>",
    "Name Query port (default 5333)",
    "5333"
  );
  program.option(
    "-up, --update-port <port-number>",
    "Name Update port (default 5444)",
    "5444"
  );

  program.parse(process.argv);
  return {
    dataPath: program.dataPath,
    test: program.test,
    queryPort: program.queryPort,
    updatePort: program.updatePort,
  };
}
