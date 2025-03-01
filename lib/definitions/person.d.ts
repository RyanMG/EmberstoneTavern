import { TRoster } from "@definitions/roster";

export type TPerson = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  status: string;
  profileImage: string;
  roster?: TRoster;
}
