[say-my-name](../README.md) › [db](db.md)

# Module: db

## Index

### Functions

* [deleteRecords](db.md#deleterecords)
* [retrieveRecords](db.md#retrieverecords)
* [storeRecords](db.md#storerecords)

## Functions

###  deleteRecords

▸ **deleteRecords**(`runtime`: [SmnRuntime](runtime.md#smnruntime), `domainName`: string): *Promise‹void›*

*Defined in [db/NameDb.ts:14](https://github.com/matthewjosephtaylor/say-my-name/blob/0262347/src/js/db/NameDb.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |
`domainName` | string |

**Returns:** *Promise‹void›*

___

###  retrieveRecords

▸ **retrieveRecords**(`runtime`: [SmnRuntime](runtime.md#smnruntime), `domainName`: [DomainName](dns.md#domainname)): *Promise‹[NameRecord](dns.md#namerecord)[]›*

*Defined in [db/NameDb.ts:44](https://github.com/matthewjosephtaylor/say-my-name/blob/0262347/src/js/db/NameDb.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |
`domainName` | [DomainName](dns.md#domainname) |

**Returns:** *Promise‹[NameRecord](dns.md#namerecord)[]›*

___

###  storeRecords

▸ **storeRecords**(`runtime`: [SmnRuntime](runtime.md#smnruntime), `resources`: [NameRecord](dns.md#namerecord)[]): *Promise‹void›*

*Defined in [db/NameDb.ts:26](https://github.com/matthewjosephtaylor/say-my-name/blob/0262347/src/js/db/NameDb.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |
`resources` | [NameRecord](dns.md#namerecord)[] |

**Returns:** *Promise‹void›*
