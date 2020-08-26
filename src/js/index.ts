import DNS, { Packet } from "dns2";
import { Google } from "dns2/client/google";

const dns = new DNS();

// @ts-ignore
console.log("Say My Name v" + VERSION);
// export type createServer = (foo: any) => any;
// const foo = dns.createServer("test");
// console.log(dns)

(async () => {
  // const result = await dns.resolveA('google.com');
  const result = await DNS.Google("google.com", "A");
  console.log("RESULT", result);
})();

// const { Packet } = dns;

const server = DNS.createServer(async (request: Packet, send, rinfo) => {
  const response = DNS.Packet.createResponseFromRequest(request);
  const [question] = request.questions;
  const { name } = question;
  // response.answers.push({
  //   name,
  //   type: DNS.Packet.TYPE.A,
  //   class: DNS.Packet.CLASS.IN,
  //   ttl: 300,
  //   address: "8.8.8.8",
  // });
  const googleResult= await DNS.Google("google.com", "A");
  response.answers.push(googleResult);
  // console.log("Google Result", googleResult);
  send(response);
  // send(googleResult);
});

server.on("request", (request, response, rinfo) => {
  console.log("REQUEST", request);
  console.log("RESPONSE", response);
  console.log("RINFO", rinfo);

  console.log(request.header.id, request.questions[0]);
});

server.listen(5333);
