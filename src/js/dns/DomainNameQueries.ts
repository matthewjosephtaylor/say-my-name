import DNS, { GoogleAnswer } from "dns2";
import { DomainName, RecordType, ResourceRecord } from "dns/ResourceRecords";

export enum Source {
  LEGACY_DNS = "LEGACY_DNS",
  GOOGLE = "GOOGLE",
  DOH = "DOH",
}

export type SourceOptions = {
  port?: number;
  address?: string;
};

export function domainNameQuery(
  domainName: DomainName,
  type: RecordType = RecordType.ANY,
  source: Source = Source.GOOGLE,
  options: SourceOptions = {}
): Promise<ResourceRecord[]> {
  switch (source) {
    case Source.GOOGLE: {
      return queryGoogle(domainName, type, options);
    }
    default: {
      return undefined;
    }
  }
}

function googleAnswerToDnsAnswer(dohAnswer: GoogleAnswer): ResourceRecord {
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
): Promise<ResourceRecord[]> {
  const googleResult = await DNS.Google(domainName, type);
  return googleResult.Answer.map((googleAnswer) =>
    googleAnswerToDnsAnswer(googleAnswer)
  );
}
