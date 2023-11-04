import bcrypt from "bcrypt";

export class Bcrypt {
  public static async hashValue(value: string):Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedValue = await bcrypt.hash(value, salt);

    return hashedValue;
  }

  public static async compare(value: string, hash: string):Promise<boolean> {
    try {
      return await bcrypt.compare(value, hash);
    } catch (error) {
      throw new Error("Values do not match");
    }
  }
}
