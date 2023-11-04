import bcrypt from "bcrypt";
import { BcryptError } from "../errors";

export class Bcrypt {
  public static async hashValue(value: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();

      const hashedValue = await bcrypt.hash(value, salt);

      return hashedValue;
    } catch (e) {
      throw new BcryptError("Issues with Bcrypt");
    }
  }

  public static async compare(value: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(value, hash);
    } catch (error) {
      throw new BcryptError("Values do not match");
    }
  }
}
