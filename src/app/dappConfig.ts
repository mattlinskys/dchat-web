import { FullConfig, TestBNB } from "@usedapp/core";

const config: Partial<FullConfig> = {
  readOnlyChainId: TestBNB.chainId,
  // readOnlyUrls: {
  //   [TestBNB.chainId]:
  //     "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  // },
};

export default config;
