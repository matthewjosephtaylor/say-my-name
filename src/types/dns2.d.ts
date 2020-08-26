// Quick-n-dirty typescript definitions for dns2
// Originally generated from dts-gen and heavily modified as time goes on
// These definitions are NOT definitive but serve as helpful guides
// See original dns2 javascript source for the truth behind these helpful lies

declare module "dns2" {
  import { EventEmitter } from "events";

  export default class DNS extends EventEmitter {
    constructor(...args: any[]);

    query(...args: any[]): void;

    resolve(...args: any[]): void;

    resolveA(...args: any[]): void;

    resolveAAAA(...args: any[]): void;

    resolveCNAME(...args: any[]): void;

    resolveMX(...args: any[]): void;

    //   static Client({ dns = "8.8.8.8", port = 53 }: any): any;

    DoH({ dns }: any): any;

    //   static DoT({ dns = "1.1.1.1", port = 53 }: any): any;

    static Google: (name: any, type?: any) => any;

    static createServer(options: any): any;

    static createTCPServer(options: any): any;

    static createUDPServer(options: any): any;

    static defaultMaxListeners: number;

    static init(): void;

    static listenerCount(emitter: any, type: any): any;

    static once(emitter: any, name: any): any;

    static usingDomains: boolean;
    static Packet: Packet;
  }
  type Packet = {
    // constructor: (data: any) => Packet;
    (data: any): Packet;

    header: Object;
    questions: Array<any>;
    answers: Array<any>;
    authorities: Array<any>;
    additionals: Array<any>;

    toBase64URL(): any;

    toBuffer(writer: any): any;

    CLASS: {
      ANY: number;
      CH: number;
      CS: number;
      HS: number;
      IN: number;
    };

    TYPE: {
      A: number;
      AAAA: number;
      ANY: number;
      AXFR: number;
      CAA: number;
      CNAME: number;
      EDNS: number;
      HINFO: number;
      MAILA: number;
      MAILB: number;
      MB: number;
      MD: number;
      MF: number;
      MG: number;
      MINFO: number;
      MR: number;
      MX: number;
      NS: number;
      NULL: number;
      PTR: number;
      SOA: number;
      SPF: number;
      SRV: number;
      TXT: number;
      WKS: number;
    };

    createResourceFromQuestion(base: any, record: any): any;

    createResponseFromRequest(request: any): any;

    parse(buffer: any): any;

    readStream(socket: any): any;

    uuid(): any;
  };

  export class TCPServer {
    constructor(...args: any[]);

    handle(...args: any[]): void;

    response(...args: any[]): void;
  }

  export class UDPServer {
    constructor(...args: any[]);

    handle(...args: any[]): void;

    listen(...args: any[]): void;

    response(...args: any[]): void;
  }

  export class Header {
    constructor(header: any);

    toBuffer(writer: any): any;

    static parse(reader: any): any;
  }

  export class Question {
    constructor(name: any, type: any, cls: any);

    toBuffer(writer: any): any;

    static decode(reader: any): any;

    static encode(question: any, writer: any): any;

    static parse(reader: any): any;
  }

  export class Reader {
    constructor(buffer: any, offset: any);

    read(size: any): any;

    static read(buffer: any, offset: any, length: any): any;
  }

  // export class Resource {
  //   constructor(name: any, type: any, cls: any, ttl: any);

  //   toBuffer(writer: any): any;

  //   static A(address: any): any;

  //   static MX(exchange: any, priority: any): any;

  //   static decode(reader: any): any;

  //   static encode(resource: any, writer: any): any;

  //   static parse(reader: any): any;
  // }

  export class Writer {
    constructor();

    toBuffer(): any;

    write(d: any, size: any): void;
  }

  export namespace Name {
    const COPY: number;

    function decode(reader: any): any;

    function encode(domain: any, writer: any): any;
  }

  export namespace Resource {
    namespace A {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace AAAA {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace CAA {
      function encode(record: any, writer: any): any;
    }

    namespace CNAME {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace EDNS {
      function decode(...args: any[]): void;

      function encode(...args: any[]): void;
    }

    namespace MX {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace NS {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace PTR {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace SOA {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace SPF {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace SRV {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }

    namespace TXT {
      function decode(reader: any, length: any): any;

      function encode(record: any, writer: any): any;
    }
  }
}
