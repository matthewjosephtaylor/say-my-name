import DNS, {
  Packet,
  UdpServer,
  UdpServerResponseFunction,
  Rinfo,
  Question,
  Resource,
  ResourceA,
  GoogleAnswer,
} from "dns2";
import { domainNameQuery } from "dns/DomainNameQueries";
import { SmnRuntime } from "runtime/SmnRuntime";
import { retrieveRecords } from "db/NameDb";
import { DomainName, NameRecord } from "dns/NameRecords";

export function startDomainNameService(runtime: SmnRuntime): Promise<number> {
  const servicer = createLocalRequestServicer(runtime);
  // const server = DNS.createServer(proxyRequest);
  const server = DNS.createServer(servicer);
  listenToRequests(server);
  server.listen(runtime.config.queryPort);
  return new Promise((resolve, reject) => {
    // stops naturally when node exits
  });
}

function listenToRequests(server: UdpServer) {
  // request is dns2 custom event
  server.on(
    "request",
    async (
      request: Packet,
      response: UdpServerResponseFunction,
      rinfo: Rinfo
    ) => {}
  );
}

type RequestServicer = (
  request: Packet,
  send: Packet,
  rinfo: Rinfo
) => Promise<void>;

function createLocalRequestServicer(runtime: SmnRuntime): RequestServicer {
  return async (request: Packet, send: Packet, rinfo: Rinfo) => {
    const [question] = request.questions;
    const domainName: DomainName = question.name;
    const localRecords: NameRecord[] = await retrieveRecords(
      runtime,
      domainName
    );
    if (localRecords === undefined) {
      proxyRequest(request, send, rinfo);
    } else {
      const response = DNS.Packet.createResponseFromRequest(request);
      response.answers.push(...localRecords);
      send(response);
    }
  };
}

async function proxyRequest(
  request: Packet,
  send: Packet,
  rinfo: Rinfo
): Promise<void> {
  const response = DNS.Packet.createResponseFromRequest(request);
  const [question] = request.questions;
  console.log("Question IS", question);
  const domainName = question.name;
  const questionType = question.type;
  console.log("Question PARTS", domainName, questionType);

  if (domainName === "test.mjt.dev") {
    const answer: ResourceA = {
      name: domainName,
      type: DNS.Packet.TYPE.A,
      class: DNS.Packet.CLASS.IN,
      ttl: 300,
      address: "1.2.3.4",
    };
    response.answers.push(answer);
  } else {
    const resourceAnswers = await domainNameQuery(domainName, questionType);
    if (resourceAnswers !== undefined) {
      response.answers.push(...resourceAnswers);
    }
  }
  send(response);
}
