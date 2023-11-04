import jwt from "jsonwebtoken";

export class JsonWebToken {
  private static SECRET: string | undefined = process.env.SECRET;

  public static async getToken(data: any) {
    if (this.SECRET == null || this.SECRET == undefined)
      throw new Error("Secret Token for JWT not setup in ENV");

    return jwt.sign(data, this.SECRET);
  }

  public static async verifyToken(token: string) {
    if (!this.SECRET) throw new Error("Secret Token for JWT not setup in ENV");
    try{
      const data:any = jwt.verify(token, this.SECRET);
      return data;
    }catch(e){
        throw new Error("Malformed JWT");
    }
  }
}
