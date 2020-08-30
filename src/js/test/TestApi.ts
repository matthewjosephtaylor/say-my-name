import { SmnRuntime } from "runtime/SmnRuntime";
import { execFile, ExecFileOptions } from "child_process";
import { DomainName } from "dns/NameRecords";
import { startServices } from "index";
import { getProjectVersion } from "project/ProjectGlobals";
import assert from "assert";

enum Script {
  setRecord = "set-record",
  queryRecord = "query-record",
  deleteRecord = "delete-record",
  waitUntilReady = "wait-until-ready",
}

const GOOD_QUERY_RESULT = `
;; QUESTION SECTION:
;foo.example.com.		IN	A

;; ANSWER SECTION:
foo.example.com.	60	IN	A	1.2.3.4
`;

export async function testApi(runtime: SmnRuntime): Promise<boolean> {
  startServices(runtime);

  // wait until services are ready
  await runScript(runtime, Script.waitUntilReady, [
    "http://localhost:" + runtime.config.updatePort + "/version",
    getProjectVersion(),
  ]);

  // test set record
  {
    const result = await runScript(runtime, Script.setRecord, [
      "foo.example.com",
      "1.2.3.4",
    ]);
    assert.equal(result, "OK");
  }

  // test query
  {
    const result = await runScript(runtime, Script.queryRecord, [
      "foo.example.com",
    ]);
    assert.match(result, new RegExp(GOOD_QUERY_RESULT));
  }

  // test delete
  {
    const result = await runScript(runtime, Script.deleteRecord, [
      "foo.example.com",
    ]);
    assert.equal(result, "OK");
  }
  return true;
}

function pathOfScript(runtime: SmnRuntime, script: Script): string {
  return [runtime.config.scriptPath, script].join("/");
}

async function runScript(
  runtime: SmnRuntime,
  script: Script,
  scriptArgs: string[]
): Promise<string> {
  const filePath = pathOfScript(runtime, script);
  const execOptions: ExecFileOptions = {
    env: {
      DNS_PORT: String(runtime.config.queryPort),
      API_PORT: String(runtime.config.updatePort),
    },
  };
  return new Promise((resolve, reject) => {
    execFile(filePath, scriptArgs, execOptions, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
}

async function setRecordViaScript(
  runtime: SmnRuntime,
  domainName: DomainName,
  address: string
): Promise<string> {
  const filePath = pathOfScript(runtime, Script.setRecord);
  return new Promise((resolve, reject) => {
    execFile(filePath, [domainName, address], (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
}
