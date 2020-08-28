import { Command } from "commander";
import { getProjectVersion } from "project/ProjectGlobals";

export type SmnConfig = {
  dataPath: string;
  scriptPath: string;
  test: string;
  queryPort: number;
  updatePort: number;
};

export function createSmnConfig(): SmnConfig {
  const program = new Command();
  program.version(getProjectVersion());
  program.option(
    "-dp, --data-path <path>",
    "data path used for record storage (default: data)",
    "data"
  );
  program.option(
    "-sp, --script-path <path>",
    "script path used for access to external commands (default: scripts)",
    "scripts"
  );
  program.option(
    "-t, --test <test-name> | all",
    "run test (Warning: some tests are destructive, use with caution)"
  );
  program.option(
    "-qp, --query-port <port-number>",
    "Name Query port (default: 5333)",
    "5333"
  );
  program.option(
    "-up, --update-port <port-number>",
    "Name Update port (default: 5444)",
    "5444"
  );

  program.parse(process.argv);
  return {
    dataPath: program.dataPath,
    scriptPath: program.scriptPath,
    test: program.test,
    queryPort: program.queryPort,
    updatePort: program.updatePort,
  };
}
