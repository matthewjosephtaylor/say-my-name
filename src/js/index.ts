import { start } from "./server/DnsServer";
import { SmnRuntime, createSmnRuntime } from "runtime/SmnRuntime";
import DNS, { ResourceA, Resource } from "dns2";
import { storeResources, retrieveResources } from "db/ResourceDb";
import { createSmnConfig } from "runtime/SmnConfig";

//@ts-ignore
console.log("Say My Name v" + VERSION);

// start();

// const config: SmnConfig = {
//   dataPath: "data",
// };

const answer: ResourceA = {
  name: "test.example.com",
  type: DNS.Packet.TYPE.A,
  class: DNS.Packet.CLASS.IN,
  ttl: 300,
  address: "1.2.3.4",
};

async function main() {
  const config = createSmnConfig();
  console.log("Configuration: ", config);
  const runtime: SmnRuntime = createSmnRuntime(config);
  await storeResources(runtime, [answer]);
  const r2: Resource[] = await retrieveResources(runtime, answer.name);
  console.log("Got back:", r2);
}

main();
