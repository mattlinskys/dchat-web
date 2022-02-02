import React from "react";
import VCard, { VCardProps } from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import { useEthers } from "@usedapp/core";

export interface ProfileVCardProps
  extends Omit<VCardProps, "user" | "account"> {
  account: string;
}

const ProfileVCard: React.FC<ProfileVCardProps> = ({ account, ...rest }) => {
  const { profile, isLoaded } = useProfile(account);
  const { account: userAccount } = useEthers();

  return (
    <VCard
      user={profile}
      isLoaded={isLoaded}
      account={account}
      isMe={account === userAccount}
      {...rest}
    />
  );
};

export default ProfileVCard;
