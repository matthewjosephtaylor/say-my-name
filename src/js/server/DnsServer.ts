import DNS, {
  Packet,
  UdpServer,
  UdpServerResponseFunction,
  Rinfo,
  Question,
  Resource,
  ResourceA,
  DoHAnswer,
} from "dns2";

export function start() {
  const server = DNS.createServer(serveRequest);
  listenToRequests(server);
  server.listen(5333);
}

function listenToRequests(server: UdpServer) {
  // request is dns2 custom event
  server.on(
    "request",
    async (
      request: Packet,
      response: UdpServerResponseFunction,
      rinfo: Rinfo
    ) => {
      // await objectToTypeScriptSource(request);
      // await objectToTypeScriptSource(response, "DnsResponse");
      // console.log("REQUEST", request.constructor.name); // result of Packet.parse whcih is a Packet
      // console.log("RESPONSE", response); // result of UdpServer.response.bind
      // console.log("RINFO", rinfo); // Udp event 'message' rinfo param https://nodejs.org/api/dgram.html#dgram_event_message
      // await objectToTypeScriptSource(rinfo, "Rinfo");
      // console.log(request.header.id, request.questions[0]);
      // console.log(request.header.id, request.questions[0]);
    }
  );
}

async function serveRequest(request: Packet, send, rinfo) {
  const response = DNS.Packet.createResponseFromRequest(request);
  const [question] = request.questions;
  const { name } = question;

  console.log("NAME IS", name);

  if (name === "test.mjt.dev") {
    const answer: ResourceA = {
      name,
      type: DNS.Packet.TYPE.A,
      class: DNS.Packet.CLASS.IN,
      ttl: 300,
      address: "1.2.3.4",
    };
    response.answers.push(answer);
  } else {
    const googleResult = await DNS.Google("google.com", "A");
    const resourceAnswers: ResourceA[] = googleResult.Answer.map(
      (dohAnswer) => {
        return dohAnswerToResourceAnswer(dohAnswer);
      }
    );
    response.answers.push(...resourceAnswers);
  }

  // console.log("RESPONSE IS", response);
  send(response);
}

function dohAnswerToResourceAnswer(dohAnswer: DoHAnswer): ResourceA {
  return {
    name: dohAnswer.name,
    // type: DNS.Packet.TYPE.A,
    type: dohAnswer.type,
    class: DNS.Packet.CLASS.IN,
    // ttl: 300,
    ttl: dohAnswer.TTL,
    // address: "8.8.8.8",
    address: dohAnswer.data,
  };
}
