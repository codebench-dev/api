import { User } from "@prisma/client";

export interface ValidatedJWTReq {
  user: User;
}
