import { Contract } from "ethers";
import factory from "abi/Factory.json";
import profile from "abi/Profile.json";
import customizable from "abi/Customizable.json";
import chat from "abi/Chat.json";

export const factoryAbi = Contract.getInterface(factory);
export const profileAbi = Contract.getInterface(profile);
export const customizableAbi = Contract.getInterface(customizable);
export const chatAbi = Contract.getInterface(chat);
