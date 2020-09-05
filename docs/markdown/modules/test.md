[say-my-name](../README.md) › [test](test.md)

# Module: test

## Index

### Type aliases

* [TestFunction](test.md#testfunction)
* [TestName](test.md#testname)

### Functions

* [runTest](test.md#runtest)
* [testApi](test.md#testapi)
* [testDomainNameQuery](test.md#testdomainnamequery)
* [testStorage](test.md#teststorage)

## Type aliases

###  TestFunction

Ƭ **TestFunction**: *function*

*Defined in [test/Tests.ts:11](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/test/Tests.ts#L11)*

#### Type declaration:

▸ (`runtime`: [SmnRuntime](runtime.md#smnruntime)): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |

___

###  TestName

Ƭ **TestName**: *string*

*Defined in [test/Tests.ts:3](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/test/Tests.ts#L3)*

## Functions

###  runTest

▸ **runTest**(`runtime`: [SmnRuntime](runtime.md#smnruntime), `testName`: [TestName](test.md#testname)): *Promise‹boolean›*

*Defined in [test/Tests.ts:13](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/test/Tests.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |
`testName` | [TestName](test.md#testname) |

**Returns:** *Promise‹boolean›*

___

###  testApi

▸ **testApi**(`runtime`: [SmnRuntime](runtime.md#smnruntime)): *Promise‹boolean›*

*Defined in [test/TestApi.ts:15](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/test/TestApi.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |

**Returns:** *Promise‹boolean›*

___

###  testDomainNameQuery

▸ **testDomainNameQuery**(`runtime`: [SmnRuntime](runtime.md#smnruntime)): *Promise‹boolean›*

*Defined in [test/TestDnsQuery.ts:10](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/test/TestDnsQuery.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |

**Returns:** *Promise‹boolean›*

___

###  testStorage

▸ **testStorage**(`runtime`: [SmnRuntime](runtime.md#smnruntime)): *Promise‹boolean›*

*Defined in [test/TestStorage.ts:14](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/test/TestStorage.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |

**Returns:** *Promise‹boolean›*
