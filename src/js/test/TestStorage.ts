import { SmnRuntime } from "runtime/SmnRuntime";
import { storeResources, retrieveResources } from "db/ResourceDb";
import DNS, { Resource, ResourceA } from "dns2";
import assert from "assert";

const testResource: ResourceA = {
  name: "test.example.com",
  type: DNS.Packet.TYPE.A,
  class: DNS.Packet.CLASS.IN,
  ttl: 300,
  address: "1.2.3.4",
};

export async function testStorage(runtime: SmnRuntime): Promise<boolean> {
  await storeResources(runtime, [testResource]);
  const retrievedResources: Resource[] = await retrieveResources(
    runtime,
    testResource.name
  );
  assert.deepEqual(retrievedResources, [testResource]);
  return true;
}
