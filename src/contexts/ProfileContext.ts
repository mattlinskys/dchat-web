import { createContext } from "react";
import { IProfile } from "types/profile";

export interface ProfileContextValue {
  profile?: IProfile;
  isLoaded: boolean;
  isAuthenticated: boolean;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export default ProfileContext;
