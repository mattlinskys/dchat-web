import React from "react";
import VCard, { VCardProps } from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import useAccountAddress from "hooks/useAccountAddress";

export interface ProfileVCardProps
  extends Omit<VCardProps, "user" | "account"> {
  account: string;
}

const ProfileVCard: React.FC<ProfileVCardProps> = ({ account, ...rest }) => {
  const { profile, isLoaded } = useProfile(account);
  const userAccount = useAccountAddress();

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
