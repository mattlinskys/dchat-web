import { createContext } from "react";
import { IProfile } from "types/profile";

export interface ProfileContextValue {
  profile?: IProfile;
  // hasProfile: boolean;
  isLoaded: boolean;
  isAuthenticated: boolean;
  // contractAddress?: string;
  // setContractAddress: (address: string) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export default ProfileContext;
