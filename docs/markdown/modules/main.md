[say-my-name](../README.md) › [Main](main.md)

# Module: Main

Main entry point

## Index

### Type aliases

* [ExitCode](main.md#exitcode)

### Variables

* [ERROR_EXIT_CODE](main.md#const-error_exit_code)
* [SUCCESS_EXIT_CODE](main.md#const-success_exit_code)

### Functions

* [startServices](main.md#startservices)

## Type aliases

###  ExitCode

Ƭ **ExitCode**: *number*

*Defined in [index.ts:23](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/index.ts#L23)*

## Variables

### `Const` ERROR_EXIT_CODE

• **ERROR_EXIT_CODE**: *1* = 1

*Defined in [index.ts:20](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/index.ts#L20)*

___

### `Const` SUCCESS_EXIT_CODE

• **SUCCESS_EXIT_CODE**: *0* = 0

*Defined in [index.ts:21](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/index.ts#L21)*

## Functions

###  startServices

▸ **startServices**(`runtime`: [SmnRuntime](runtime.md#smnruntime)): *Promise‹[ExitCode](main.md#exitcode)›*

*Defined in [index.ts:51](https://github.com/matthewjosephtaylor/say-my-name/blob/57773d3/src/js/index.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) |

**Returns:** *Promise‹[ExitCode](main.md#exitcode)›*
