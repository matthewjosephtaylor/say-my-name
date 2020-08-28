import { SmnRuntime } from "runtime/SmnRuntime";
import { storeRecords, retrieveRecords, deleteRecords } from "db/NameDb";
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
  await storeRecords(runtime, [testResource]);
  {
    const retrievedResources: Resource[] = await retrieveRecords(
      runtime,
      testResource.name
    );
    assert.deepEqual(retrievedResources, [testResource]);
  }
  await deleteRecords(runtime, testResource.name);
  {
    const retrievedResources: Resource[] = await retrieveRecords(
      runtime,
      testResource.name
    );
    assert.strictEqual(retrievedResources, undefined);
  }
  return true;
}
