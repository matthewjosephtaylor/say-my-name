import { SmnRuntime } from "runtime/SmnRuntime";
import { execFile, ExecFileOptions, ExecException } from "child_process";
import { ExitCode, SUCCESS_EXIT_CODE } from "index";
import { toMany } from "object/Objects";

/**
 * @see {@link scripts } directory
 */
export enum Script {
  setRecord = "set-record",
  queryRecord = "query-record",
  deleteRecord = "delete-record",
  waitUntilReady = "wait-until-ready",
  createRootCaCert = "create-root-ca-cert",
  testKeyExists = "test-key-exists",
  docs = "docs",
}

export type StdOutString = string;
export type StdErrorString = string;
export type KillSignal = string;

export type ScriptResult = [
  stdout: StdOutString,
  stderr: StdErrorString,
  exitCode: ExitCode,
  killSignal: KillSignal
];

/**
 * @see https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback
 */
export type ScriptOptions = ExecFileOptions & {
  failOnError?: boolean;
};

export function isScriptResultSuccessful(scriptResult: ScriptResult): boolean {
  const [stdout, stderr, exitCode, signal] = scriptResult;
  return exitCode === SUCCESS_EXIT_CODE;
}

export function logScriptResult(scriptResult: ScriptResult): void {
  const [stdout, stderr, exitCode, signal] = scriptResult;
  if (stdout !== undefined) {
    console.log(stdout);
  }
  if (stderr !== undefined) {
    console.error(stderr);
  }
}

/**
 * Runs scripts found int the scripts directory
 * @see @type {Script} for list of known scripts
 */
export async function runScript(
  runtime: SmnRuntime,
  script: Script,
  scriptArgs: string[] | string = [],
  options: ScriptOptions = {
    failOnError: true,
    timeout: 10 * 1000, // millis, 0 for no timeout
  }
): Promise<ScriptResult> {
  const filePath = pathOfScript(runtime, script);
  const runtimeOptions: ExecFileOptions = {
    env: {
      DNS_PORT: String(runtime.config.queryPort),
      API_PORT: String(runtime.config.updatePort),
    },
  };

  Object.assign(options, runtimeOptions);

  return new Promise((resolve, reject) => {
    execFile(
      filePath,
      toMany(scriptArgs),
      options,
      (error: ExecException, stdout, stderr) => {
        const exitCode: ExitCode = error ? error.code : SUCCESS_EXIT_CODE;
        const killSignal: NodeJS.Signals = error ? error.signal : undefined;
        const result: ScriptResult = [stdout, stderr, exitCode, killSignal];
        if (error && options.failOnError) {
          reject(result);
        }
        resolve(result);
      }
    );
  });
}

function pathOfScript(runtime: SmnRuntime, script: Script): string {
  return [runtime.config.scriptPath, script].join("/");
}
