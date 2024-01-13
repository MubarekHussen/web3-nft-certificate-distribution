/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  CoreAppCallArgs,
  RawAppCallArgs,
  AppState,
  TealTemplateParams,
  ABIAppCallArg,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner, modelsv2 } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "add(uint64,uint64)uint64": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "read_result()uint64": {
      "read_only": true,
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NzI2NTczNzU2Yzc0IDB4MTUxZjdjNzUKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhmZTZiZGY2OSAvLyAiYWRkKHVpbnQ2NCx1aW50NjQpdWludDY0Igo9PQpibnogbWFpbl9sNQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGMyZjI1MDY2IC8vICJyZWFkX3Jlc3VsdCgpdWludDY0Igo9PQpibnogbWFpbl9sNAplcnIKbWFpbl9sNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiByZWFkcmVzdWx0Y2FzdGVyXzMKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgYWRkY2FzdGVyXzIKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDY6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KYm56IG1haW5fbDgKZXJyCm1haW5fbDg6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydAppbnRjXzEgLy8gMQpyZXR1cm4KCi8vIGFkZAphZGRfMDoKcHJvdG8gMiAxCmludGNfMCAvLyAwCmJ5dGVjXzAgLy8gInJlc3VsdCIKZnJhbWVfZGlnIC0yCmZyYW1lX2RpZyAtMQorCmFwcF9nbG9iYWxfcHV0CmZyYW1lX2RpZyAtMgpmcmFtZV9kaWcgLTEKKwpmcmFtZV9idXJ5IDAKcmV0c3ViCgovLyByZWFkX3Jlc3VsdApyZWFkcmVzdWx0XzE6CnByb3RvIDAgMQppbnRjXzAgLy8gMApieXRlY18wIC8vICJyZXN1bHQiCmFwcF9nbG9iYWxfZ2V0CmZyYW1lX2J1cnkgMApyZXRzdWIKCi8vIGFkZF9jYXN0ZXIKYWRkY2FzdGVyXzI6CnByb3RvIDAgMAppbnRjXzAgLy8gMApkdXBuIDIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpidG9pCmZyYW1lX2J1cnkgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKZnJhbWVfYnVyeSAyCmZyYW1lX2RpZyAxCmZyYW1lX2RpZyAyCmNhbGxzdWIgYWRkXzAKZnJhbWVfYnVyeSAwCmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMAppdG9iCmNvbmNhdApsb2cKcmV0c3ViCgovLyByZWFkX3Jlc3VsdF9jYXN0ZXIKcmVhZHJlc3VsdGNhc3Rlcl8zOgpwcm90byAwIDAKaW50Y18wIC8vIDAKY2FsbHN1YiByZWFkcmVzdWx0XzEKZnJhbWVfYnVyeSAwCmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMAppdG9iCmNvbmNhdApsb2cKcmV0c3Vi",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu"
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 1
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "result": {
          "type": "uint64",
          "key": "result",
          "descr": ""
        }
      },
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "calculator",
    "methods": [
      {
        "name": "add",
        "args": [
          {
            "type": "uint64",
            "name": "a"
          },
          {
            "type": "uint64",
            "name": "b"
          }
        ],
        "returns": {
          "type": "uint64"
        }
      },
      {
        "name": "read_result",
        "args": [],
        "returns": {
          "type": "uint64"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {
    "no_op": "CREATE"
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt 
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

/**
 * Defines the types of available calls and state of the Calculator smart contract.
 */
export type Calculator = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'add(uint64,uint64)uint64' | 'add', {
      argsObj: {
        a: bigint | number
        b: bigint | number
      }
      argsTuple: [a: bigint | number, b: bigint | number]
      returns: bigint
    }>
    & Record<'read_result()uint64' | 'read_result', {
      argsObj: {
      }
      argsTuple: []
      returns: bigint
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      'result'?: IntegerState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type CalculatorSig = keyof Calculator['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends CalculatorSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the Calculator smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends CalculatorSig> = Calculator['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the Calculator smart contract to the method's return type
 */
export type MethodReturn<TSignature extends CalculatorSig> = Calculator['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type CalculatorCreateCalls = (typeof CalculatorCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type CalculatorCreateCallParams =
  | (TypedCallParams<undefined> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type CalculatorDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: CalculatorCreateCalls) => CalculatorCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class CalculatorCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the calculator smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: undefined,
          methodArgs: undefined,
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the add(uint64,uint64)uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static add(args: MethodArgs<'add(uint64,uint64)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'add(uint64,uint64)uint64' as const,
      methodArgs: Array.isArray(args) ? args : [args.a, args.b],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the read_result()uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static readResult(args: MethodArgs<'read_result()uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'read_result()uint64' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
}

/**
 * A client to make calls to the calculator smart contract
 */
export class CalculatorClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `CalculatorClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue }
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof Calculator['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the calculator smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: CalculatorDeployArgs & AppClientDeployCoreParams = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(CalculatorCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the calculator smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      bare(args: BareCallArgs & AppClientCallCoreParams & AppClientCompilationParams & CoreAppCallArgs & (OnCompleteNoOp) = {}): Promise<AppCallTransactionResultOfType<undefined>> {
        return $this.appClient.create(args) as unknown as Promise<AppCallTransactionResultOfType<undefined>>
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the calculator smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the add(uint64,uint64)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public add(args: MethodArgs<'add(uint64,uint64)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(CalculatorCallFactory.add(args, params))
  }

  /**
   * Calls the read_result()uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public readResult(args: MethodArgs<'read_result()uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(CalculatorCallFactory.readResult(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<Calculator['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get result() {
        return CalculatorClient.getIntegerState(state, 'result')
      },
    }
  }

  public compose(): CalculatorComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      add(args: MethodArgs<'add(uint64,uint64)uint64'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.add(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      readResult(args: MethodArgs<'read_result()uint64'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.readResult(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate() {
        await promiseChain
        const result = await atc.simulate(client.algod)
        return result
      },
      async execute() {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams: {} }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as CalculatorComposer
  }
}
export type CalculatorComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the add(uint64,uint64)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  add(args: MethodArgs<'add(uint64,uint64)uint64'>, params?: AppClientCallCoreParams & CoreAppCallArgs): CalculatorComposer<[...TReturns, MethodReturn<'add(uint64,uint64)uint64'>]>

  /**
   * Calls the read_result()uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  readResult(args: MethodArgs<'read_result()uint64'>, params?: AppClientCallCoreParams & CoreAppCallArgs): CalculatorComposer<[...TReturns, MethodReturn<'read_result()uint64'>]>

  /**
   * Makes a clear_state call to an existing instance of the calculator smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs): CalculatorComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): CalculatorComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(): Promise<CalculatorComposerSimulateResult>
  /**
   * Executes the transaction group and returns the results
   */
  execute(): Promise<CalculatorComposerResults<TReturns>>
}
export type CalculatorComposerSimulateResult = {
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type CalculatorComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
