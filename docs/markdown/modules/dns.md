[say-my-name](../README.md) › [dns](dns.md)

# Module: dns

## Index

### Enumerations

* [RecordClass](../enums/dns.recordclass.md)
* [RecordType](../enums/dns.recordtype.md)
* [Source](../enums/dns.source.md)

### Type aliases

* [DomainName](dns.md#domainname)
* [NameRecord](dns.md#namerecord)
* [SourceOptions](dns.md#sourceoptions)

### Functions

* [domainNameQuery](dns.md#domainnamequery)

## Type aliases

###  DomainName

Ƭ **DomainName**: *string*

*Defined in [dns/NameRecords.ts:1](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/dns/NameRecords.ts#L1)*

___

###  NameRecord

Ƭ **NameRecord**: *object*

*Defined in [dns/NameRecords.ts:39](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/dns/NameRecords.ts#L39)*

#### Type declaration:

* **address**: *string*

* **class**: *[RecordClass](../enums/dns.recordclass.md)*

* **name**: *[DomainName](dns.md#domainname)*

* **ttl**: *number*

* **type**: *[RecordType](../enums/dns.recordtype.md)*

___

###  SourceOptions

Ƭ **SourceOptions**: *object*

*Defined in [dns/DomainNameQueries.ts:10](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/dns/DomainNameQueries.ts#L10)*

#### Type declaration:

* **address**? : *string*

* **port**? : *number*

## Functions

###  domainNameQuery

▸ **domainNameQuery**(`domainName`: [DomainName](dns.md#domainname), `type`: [RecordType](../enums/dns.recordtype.md), `source`: [Source](../enums/dns.source.md), `options`: [SourceOptions](dns.md#sourceoptions)): *Promise‹[NameRecord](dns.md#namerecord)[]›*

*Defined in [dns/DomainNameQueries.ts:15](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/dns/DomainNameQueries.ts#L15)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`domainName` | [DomainName](dns.md#domainname) | - |
`type` | [RecordType](../enums/dns.recordtype.md) | RecordType.ANY |
`source` | [Source](../enums/dns.source.md) | Source.GOOGLE |
`options` | [SourceOptions](dns.md#sourceoptions) | {} |

**Returns:** *Promise‹[NameRecord](dns.md#namerecord)[]›*
