import * as user from "../user"
import prisma from "../../db";

import exp from "node:constants";

describe("POST /create/user", () => {
    afterAll(async () => {
        await prisma.user.delete({
            where: {
                username: "test"
            }
        })
    })
    it("should create a user", async () => {
        const req = {
            body: {
                username: "test",
                password: "test",
            }
        }
        const res = {json({token}) {expect(token).toBeTruthy()}}
        await user.createUser(req, res, ()=>{})
    })
})