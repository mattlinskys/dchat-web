/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_FACTORY_ADDRESS: string;
    REACT_APP_TARGET_CHAIN_ID: string;
    REACT_APP_LOCALNODE_MULTICALL_ADDRESS: string;
    REACT_APP_ORIGIN: string;
  }
}
