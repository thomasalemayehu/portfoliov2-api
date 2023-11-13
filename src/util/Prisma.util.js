"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const client_1 = require("@prisma/client");
class Prisma {
    static getInstance() {
        if (this.CLIENT == null || this.CLIENT == undefined)
            this.CLIENT = new client_1.PrismaClient();
        return this.CLIENT;
    }
}
exports.Prisma = Prisma;
