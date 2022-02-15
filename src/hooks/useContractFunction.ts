import { useCallback, useState } from "react";
import { Contract } from "ethers";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { addressEqual } from "@usedapp/core";
import { LogDescription } from "ethers/lib/utils";

interface IBaseState {
  status: "idle" | "pending" | "minting";
}

interface IFulfilledState {
  status: "success";
  events?: LogDescription[];
  transaction: TransactionResponse;
  receipt: TransactionReceipt;
}

interface IRejectedState {
  status: "error";
  message?: string;
  transaction?: TransactionResponse;
}

type TState = IBaseState | IRejectedState | IFulfilledState;

const defaultState: TState = { status: "idle" };

const useContractFunction = (name: string, contract?: Contract) => {
  const [state, setState] = useState<TState>(defaultState);

  const send = useCallback(
    async (...args: any[]) => {
      let transaction: TransactionResponse | undefined = undefined;
      try {
        setState({ status: "pending" });
        transaction = await contract!.functions[name](...args);
        setState({ status: "minting" });

        const receipt = await transaction!.wait();
        let events: LogDescription[] | undefined;

        if (receipt?.logs) {
          events = receipt.logs.reduce((accumulatedLogs, log) => {
            try {
              return addressEqual(log.address, contract!.address)
                ? [...accumulatedLogs, contract!.interface.parseLog(log)]
                : accumulatedLogs;
            } catch {
              return accumulatedLogs;
            }
          }, [] as LogDescription[]);
        }

        setState({
          status: "success",
          transaction: transaction!,
          receipt,
          events,
        });
      } catch (err: any) {
        const message =
          err.error?.message ?? err.reason ?? err.data?.message ?? err.message;
        setState({ status: "error", message, transaction });
      }
    },
    [name, contract]
  );

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  return { send, reset, state };
};

export default useContractFunction;
