[say-my-name](../README.md) › [script](script.md)

# Module: script

## Index

### Enumerations

* [Script](../enums/script.script-1.md)

### Type aliases

* [KillSignal](script.md#killsignal)
* [ScriptOptions](script.md#scriptoptions)
* [ScriptResult](script.md#scriptresult)
* [StdErrorString](script.md#stderrorstring)
* [StdOutString](script.md#stdoutstring)

### Functions

* [isScriptResultSuccessful](script.md#isscriptresultsuccessful)
* [logScriptResult](script.md#logscriptresult)
* [runScript](script.md#runscript)

## Type aliases

###  KillSignal

Ƭ **KillSignal**: *string*

*Defined in [script/Scripts.ts:21](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L21)*

___

###  ScriptOptions

Ƭ **ScriptOptions**: *ExecFileOptions & object*

*Defined in [script/Scripts.ts:33](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L33)*

**`see`** https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback

___

###  ScriptResult

Ƭ **ScriptResult**: *[stdout: StdOutString, stderr: StdErrorString, exitCode: ExitCode, killSignal: KillSignal]*

*Defined in [script/Scripts.ts:23](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L23)*

___

###  StdErrorString

Ƭ **StdErrorString**: *string*

*Defined in [script/Scripts.ts:20](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L20)*

___

###  StdOutString

Ƭ **StdOutString**: *string*

*Defined in [script/Scripts.ts:19](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L19)*

## Functions

###  isScriptResultSuccessful

▸ **isScriptResultSuccessful**(`scriptResult`: [ScriptResult](script.md#scriptresult)): *boolean*

*Defined in [script/Scripts.ts:37](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`scriptResult` | [ScriptResult](script.md#scriptresult) |

**Returns:** *boolean*

___

###  logScriptResult

▸ **logScriptResult**(`scriptResult`: [ScriptResult](script.md#scriptresult)): *void*

*Defined in [script/Scripts.ts:42](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`scriptResult` | [ScriptResult](script.md#scriptresult) |

**Returns:** *void*

___

###  runScript

▸ **runScript**(`runtime`: [SmnRuntime](runtime.md#smnruntime), `script`: [Script](../enums/script.script-1.md), `scriptArgs`: string[] | string, `options`: [ScriptOptions](script.md#scriptoptions)): *Promise‹[ScriptResult](script.md#scriptresult)›*

*Defined in [script/Scripts.ts:56](https://github.com/matthewjosephtaylor/say-my-name/blob/3dc1c34/src/js/script/Scripts.ts#L56)*

Runs scripts found int the scripts directory

**`see`** @type {Script} for list of known scripts

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`runtime` | [SmnRuntime](runtime.md#smnruntime) | - |
`script` | [Script](../enums/script.script-1.md) | - |
`scriptArgs` | string[] &#124; string | [] |
`options` | [ScriptOptions](script.md#scriptoptions) | {
    failOnError: true,
    timeout: 10 * 1000, // millis, 0 for no timeout
  } |

**Returns:** *Promise‹[ScriptResult](script.md#scriptresult)›*
