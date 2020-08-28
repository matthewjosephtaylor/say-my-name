import DNS, { GoogleAnswer } from "dns2";
import { DomainName, RecordType, NameRecord } from "dns/NameRecords";

export enum Source {
  LEGACY_DNS = "LEGACY_DNS",
  GOOGLE = "GOOGLE",
  DOH = "DOH",
}

export type SourceOptions = {
  port?: number;
  address?: string;
};

export async function domainNameQuery(
  domainName: DomainName,
  type: RecordType = RecordType.ANY,
  source: Source = Source.GOOGLE,
  options: SourceOptions = {}
): Promise<NameRecord[]> {
  switch (source) {
    case Source.GOOGLE: {
      return queryGoogle(domainName, type, options);
    }
    default: {
      return undefined;
    }
  }
}

function googleAnswerToDnsAnswer(dohAnswer: GoogleAnswer): NameRecord {
  return {
    name: dohAnswer.name,
    type: dohAnswer.type,
    class: DNS.Packet.CLASS.IN,
    ttl: dohAnswer.TTL,
    address: dohAnswer.data,
  };
}

async function queryGoogle(
  domainName: DomainName,
  type: RecordType,
  options: SourceOptions
): Promise<NameRecord[]> {
  const googleResult = await DNS.Google(domainName, type);
  return googleResult?.Answer?.map((googleAnswer) =>
    googleAnswerToDnsAnswer(googleAnswer)
  );
}
