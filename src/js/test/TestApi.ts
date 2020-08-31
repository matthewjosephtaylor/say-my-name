import { SmnRuntime } from "runtime/SmnRuntime";
import { startServices } from "index";
import { getProjectVersion } from "project/ProjectGlobals";
import assert from "assert";
import { runScript, Script } from "script/Scripts";

const GOOD_QUERY_RESULT = `
;; QUESTION SECTION:
;foo.example.com.		IN	A

;; ANSWER SECTION:
foo.example.com.	60	IN	A	1.2.3.4
`;

export async function testApi(runtime: SmnRuntime): Promise<boolean> {
  startServices(runtime);

  // wait until services are ready, also works as a smoke test
  await runScript(runtime, Script.waitUntilReady, [
    "http://localhost:" + runtime.config.updatePort + "/version",
    getProjectVersion(),
  ]);

  // test set record
  {
    const [result] = await runScript(runtime, Script.setRecord, [
      "foo.example.com",
      "1.2.3.4",
    ]);
    assert.equal(result, "OK");
  }

  // test query
  {
    const [result] = await runScript(runtime, Script.queryRecord, [
      "foo.example.com",
    ]);
    assert.match(result, new RegExp(GOOD_QUERY_RESULT));
  }

  // test delete
  {
    const [result] = await runScript(runtime, Script.deleteRecord, [
      "foo.example.com",
    ]);
    assert.equal(result, "OK");
  }
  return true;
}
