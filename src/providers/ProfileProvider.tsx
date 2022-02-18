import React, { useMemo } from "react";
import ProfileContext, { ProfileContextValue } from "contexts/ProfileContext";
import useAccountAddress from "hooks/useAccountAddress";
import useProfile from "hooks/useProfile";

const ProfileProvider: React.FC = ({ children }) => {
  const account = useAccountAddress();
  const { profile, isLoaded } = useProfile(account, true);

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
