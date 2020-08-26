import DNS from 'dns2';

// const dns = new DNS();

// @ts-ignore
console.log("Say My Name v" + VERSION);
// export type createServer = (foo: any) => any;
// const foo = dns.createServer("test");
// console.log(dns)

// (async () => {
//   const result = await dns.resolveA('google.com');
//   console.log(result.answers);
// })();

// const { Packet } = dns;

const server = DNS.createServer((request, send, rinfo) => {
  const response = DNS.Packet.createResponseFromRequest(request);
  const [question] = request.questions;
  const { name } = question;
  response.answers.push({
    name,
    type: DNS.Packet.TYPE.A,
    class: DNS.Packet.CLASS.IN,
    ttl: 300,
    address: "8.8.8.8",
  });
  send(response);
});

server.on("request", (request, response, rinfo) => {
  console.log(request.header.id, request.questions[0]);
});

server.listen(5333);
