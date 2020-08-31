import { SmnRuntime } from "runtime/SmnRuntime";
import { isScriptResultSuccessful, runScript, Script } from "script/Scripts";

const ROOT_CA_KEY = "rootCA.key";

export async function setupRootCa(runtime: SmnRuntime): Promise<boolean> {
  if (testRootCaKeyExists(runtime)) {
    console.log(`Using existing ${ROOT_CA_KEY}`);
  } else {
    console.log(`No ${ROOT_CA_KEY} found, creating new root CA key`);
    await runScript(runtime, Script.createRootCaCert);
  }
  return testRootCaKeyExists(runtime);
}

async function testRootCaKeyExists(runtime: SmnRuntime): Promise<boolean> {
  const rootKeyExists = await runScript(
    runtime,
    Script.testKeyExists,
    ROOT_CA_KEY,
    {
      failOnError: false,
    }
  );
  return isScriptResultSuccessful(rootKeyExists);
}
