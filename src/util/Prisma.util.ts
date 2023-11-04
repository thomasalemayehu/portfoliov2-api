import { PrismaClient } from "@prisma/client";

export class Prisma {
  private static CLIENT: PrismaClient;

  public static getInstance(): PrismaClient {
    if (this.CLIENT == null || this.CLIENT == undefined)
      this.CLIENT = new PrismaClient();

    return this.CLIENT;
  }
}

