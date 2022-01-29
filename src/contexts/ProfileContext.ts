import { createContext } from "react";
import { IProfile } from "types/profile";

export interface ProfileContextValue {
  profile?: IProfile;
  setProfile: (profile: IProfile) => void;
  setAddress: (address: string) => void;
  isLoaded: boolean;
  isAuthenticated: boolean;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export default ProfileContext;
