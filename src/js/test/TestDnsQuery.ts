import { SmnRuntime } from "runtime/SmnRuntime";
import { domainNameQuery, DnsAnswer } from "dns/DomainNameQueries";
import assert from "assert";

const TEST_NAMES: { [k in string]: string } = {
  "lvh.me": "127.0.0.1",
};

export async function testDomainNameQuery(
  runtime: SmnRuntime
): Promise<boolean> {
  for (const [domainName, address] of Object.entries(TEST_NAMES)) {
    console.log("testing name", domainName)
    const answers: DnsAnswer[] = await domainNameQuery(domainName);
    const containsAddress =
      answers.filter((ans) => ans.address === address).length > 0;
    if (!containsAddress) {
      throw `${domainName} does not contain address ${address}`;
    }
  }
  return true;
}
