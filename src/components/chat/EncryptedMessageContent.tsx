import React, { useContext } from "react";
import MessageContent from "components/chat/MessageContent";
import ChatContext from "contexts/ChatContext";
import { useContractCall, useEthers } from "@usedapp/core";
import { chatAbi } from "app/abis";
import { utils } from "ethers";

export interface EncryptedMessageContentProps {
  messageId: number;
}

const EncryptedMessageContent: React.FC<EncryptedMessageContentProps> = ({
  messageId,
}) => {
  const { account } = useEthers();
  const { chat } = useContext(ChatContext)!;

  const [data] =
    useContractCall(
      account &&
        chat?.address && {
          abi: chatAbi,
          address: chat.address,
          method: "messagesCipher",
          args: [
            utils.keccak256(
              utils.defaultAbiCoder.encode(
                ["uint256", "address"],
                [messageId, account]
              )
            ),
          ],
        }
    ) ?? [];
  // TODO: Decrypt
  const content = data && utils.toUtf8String(data);

  return content ? <MessageContent content={content} /> : <></>;
};

export default EncryptedMessageContent;
