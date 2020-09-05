[say-my-name](../README.md) › [typing](typing.md)

# Module: typing

## Index

### Functions

* [objectToTypeScriptSource](typing.md#objecttotypescriptsource)

## Functions

###  objectToTypeScriptSource

▸ **objectToTypeScriptSource**(`obj`: object, `topLevelObjectName?`: string, `printToConsole`: boolean): *Promise‹string›*

*Defined in [typing/TypeGenerators.ts:13](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/typing/TypeGenerators.ts#L13)*

Print and return source code for TypeScript types for given object

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`obj` | object | - | Javascript Object |
`topLevelObjectName?` | string | - | Name to use if no type name is discovered |
`printToConsole` | boolean | true | print to console (default true)  |

**Returns:** *Promise‹string›*
