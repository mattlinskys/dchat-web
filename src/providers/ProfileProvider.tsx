import React, { useMemo } from "react";
import ProfileContext, { ProfileContextValue } from "contexts/ProfileContext";
import { useEthers } from "@usedapp/core";
import useProfile from "hooks/useProfile";

const ProfileProvider: React.FC = ({ children }) => {
  const { account } = useEthers();
  const { profile, isLoaded } = useProfile(account || undefined);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      isLoaded,
      isAuthenticated: !!profile && isLoaded,
    }),
    [profile, isLoaded]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
