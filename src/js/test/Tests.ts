import { SmnRuntime } from "runtime/SmnRuntime";

export type TestName = string;
import { testStorage } from "./TestStorage";
import { testDomainNameQuery } from "test/TestDnsQuery";

const TESTS: TestFunction[] = [testStorage, testDomainNameQuery];

export type TestFunction = (runtime: SmnRuntime) => Promise<boolean>;

export async function runTest(
  runtime: SmnRuntime,
  testName: TestName
): Promise<boolean> {
  let testQuery = testName.toLocaleLowerCase();
  testQuery = testQuery.startsWith("test") ? testQuery : "test" + testQuery;
  if (testQuery === "testall") {
    return testAll(runtime);
  }
  const testFunction = findTest(testQuery);
  if (testFunction === undefined) {
    console.log(`No test found with name ${testName}`);
    return false;
  }
  try {
    const testResult = await testFunction(runtime);
    testResult
      ? console.log(`${testName}\tPassed :)`)
      : console.log(`${testName}\tFailed :(`);
    return testResult;
  } catch (e) {
    console.log(`${testName} failed with error:`, e);
    return false;
  }
}

function findTest(testQuery: string): TestFunction {
  return TESTS.filter((test) => test.name.toLowerCase() === testQuery)[0];
}

async function testAll(runtime: SmnRuntime): Promise<boolean> {
  for (const test of TESTS) {
    const testName = test.name;
    const testResult = await runTest(runtime, testName);
    if (!testResult) {
      return false;
    }
  }
  console.log("All tests Passed");
  return true;
}
