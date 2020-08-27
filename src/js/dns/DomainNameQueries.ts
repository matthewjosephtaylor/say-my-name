import DNS, { GoogleJsonResponse, GoogleAnswer, ResourceA } from "dns2";

export enum Source {
  LEGACY_DNS = "LEGACY_DNS",
  GOOGLE = "GOOGLE",
  DOH = "DOH",
}

export type SourceOptions = {
  port?: number;
  address?: string;
};

export type DomainName = string;

export enum RecordType {
  A = 0x01,
  NS = 0x02,
  MD = 0x03,
  MF = 0x04,
  CNAME = 0x05,
  SOA = 0x06,
  MB = 0x07,
  MG = 0x08,
  MR = 0x09,
  NULL = 0x0a,
  WKS = 0x0b,
  PTR = 0x0c,
  HINFO = 0x0d,
  MINFO = 0x0e,
  MX = 0x0f,
  TXT = 0x10,
  AAAA = 0x1c,
  SRV = 0x21,
  EDNS = 0x29,
  SPF = 0x63,
  AXFR = 0xfc,
  MAILB = 0xfd,
  MAILA = 0xfe,
  ANY = 0xff,
  CAA = 0x101,
}

export enum RecordClass {
  IN = 0x01,
  CS = 0x02,
  CH = 0x03,
  HS = 0x04,
  ANY = 0xff,
}

export type DnsAnswer = {
  name: string;
  type: RecordType;
  class: RecordClass;
  // ttl: 300,
  ttl: number;
  // address: "8.8.8.8",
  address: string;
};

export function domainNameQuery(
  domainName: DomainName,
  type: RecordType = RecordType.ANY,
  source: Source = Source.GOOGLE,
  options: SourceOptions = {}
): Promise<DnsAnswer[]> {
  switch (source) {
    case Source.GOOGLE: {
      return queryGoogle(domainName, type, options);
    }
    default: {
      return undefined;
    }
  }
}

function googleAnswerToDnsAnswer(dohAnswer: GoogleAnswer): DnsAnswer {
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

async function queryGoogle(
  domainName: DomainName,
  type: RecordType,
  options: SourceOptions
): Promise<DnsAnswer[]> {
  console.log(`GOOGLEing ${domainName} ${type}`);
  const googleResult = await DNS.Google(domainName, type);
  console.log(`GOOGLE RESULT `, googleResult);
  return googleResult.Answer.map((googleAnswer) =>
    googleAnswerToDnsAnswer(googleAnswer)
  );
}
