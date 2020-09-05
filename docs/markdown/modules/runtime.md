[say-my-name](../README.md) › [runtime](runtime.md)

# Module: runtime

## Index

### Type aliases

* [SmnConfig](runtime.md#smnconfig)
* [SmnRuntime](runtime.md#smnruntime)

### Functions

* [createSmnConfig](runtime.md#createsmnconfig)
* [createSmnRuntime](runtime.md#createsmnruntime)

## Type aliases

###  SmnConfig

Ƭ **SmnConfig**: *object*

*Defined in [runtime/SmnConfig.ts:4](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/runtime/SmnConfig.ts#L4)*

#### Type declaration:

* **dataPath**: *string*

* **queryPort**: *number*

* **scriptPath**: *string*

* **test**: *string*

* **updatePort**: *number*

___

###  SmnRuntime

Ƭ **SmnRuntime**: *object*

*Defined in [runtime/SmnRuntime.ts:3](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/runtime/SmnRuntime.ts#L3)*

#### Type declaration:

* **config**: *[SmnConfig](runtime.md#smnconfig)*

## Functions

###  createSmnConfig

▸ **createSmnConfig**(): *[SmnConfig](runtime.md#smnconfig)*

*Defined in [runtime/SmnConfig.ts:12](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/runtime/SmnConfig.ts#L12)*

**Returns:** *[SmnConfig](runtime.md#smnconfig)*

___

###  createSmnRuntime

▸ **createSmnRuntime**(`config`: [SmnConfig](runtime.md#smnconfig)): *[SmnRuntime](runtime.md#smnruntime)*

*Defined in [runtime/SmnRuntime.ts:7](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/runtime/SmnRuntime.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [SmnConfig](runtime.md#smnconfig) |

**Returns:** *[SmnRuntime](runtime.md#smnruntime)*
