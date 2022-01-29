import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from "contexts/ProfileContext";
import { Button, Text } from "@chakra-ui/react";
import { PROFILE_HASH, SETUP_PROFILE_HASH } from "constants/hashes";

const ProfileTrigger: React.FC = () => {
  const navigate = useNavigate();
  const { profile, isLoaded } = useContext(ProfileContext)!;

  return isLoaded ? (
    profile ? (
      <>
        <Text>
          Profile: {profile.name} {profile.account} {profile.address}
        </Text>
        <Button onClick={() => navigate(`#${PROFILE_HASH}`)}>
          Edit profile
        </Button>
      </>
    ) : (
      <>
        <Button onClick={() => navigate(`#${SETUP_PROFILE_HASH}`)}>
          Setup profile
        </Button>
      </>
    )
  ) : (
    <>Loading..</>
  );
};

export default ProfileTrigger;
