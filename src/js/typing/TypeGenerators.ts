import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";

/**
 * Print and return source code for TypeScript types for given object
 * @param obj Javascript Object
 * @param topLevelObjectName Name to use if no type name is discovered
 * @param printToConsole print to console (default true)
 */
export async function objectToTypeScriptSource(
  obj: object,
  topLevelObjectName?: string,
  printToConsole: boolean = true
): Promise<string> {
  const jsonInput = jsonInputForTargetLanguage("typescript");
  const constructorName = obj?.constructor?.name;
  if (topLevelObjectName === undefined && constructorName !== undefined) {
    topLevelObjectName = constructorName;
  }
  if (topLevelObjectName === undefined || topLevelObjectName === "Object") {
    topLevelObjectName = "UnknownTopLevel";
  }

  const jsonString = JSON.stringify(obj);
  let sourceCode = undefined;

  if (jsonString === undefined) {
    sourceCode = `type ${topLevelObjectName} = any; // unable to stringify object`;
  } else {
    await jsonInput.addSource({
      name: topLevelObjectName,
      samples: [jsonString],
    });
    const inputData = new InputData();
    inputData.addInput(jsonInput);
    const quickTypeResult = await quicktype({
      inputData,
      lang: "typescript",
      rendererOptions: { "just-types": "true" },
    });
    sourceCode = quickTypeResult.lines.join("\n");
  }

  if (printToConsole) {
    console.log(sourceCode);
  }
  return sourceCode;
}
