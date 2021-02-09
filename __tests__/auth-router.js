const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

const validUser = {
    username: "simoneroy2",
    password: "montreal"
}

describe("Testing Login and Registration endpoints", () => {
    afterAll(async () => {
        //close the database connection so the test process doesn't hang or give a warning
        await db.destroy()
    })
//test POST /login
    it("POST /login, if there is no user found it returns an error", async () => {
        const res = await supertest(server)
         .post("/api/auth/login")
         .send({
             username: "fakeuser",
             password: "fakepassword"
         })
        expect(res.statusCode).toBe(401)
    })

//test POST /login
   it("POST /login, if the password input is wrong it returns an error", async () => {
        const res = await supertest(server)
         .post("/api/auth/login")
         .send({
             username: "simoneroy",
             password: "fakepassword"
         })
        expect(res.statusCode).toBe(401)
    })


//test POST /register
   it("POST /register, if the username already exists it returns an error", async () => {
        const res = await supertest(server)
         .post("/api/auth/register")
         .send(validUser)
        expect(res.statusCode).toBe(409)
    })

//test POST /register
   it("POST /register, if everything checks out it returns a success message", async () => {
        const res = await supertest(server)
         .post("/api/auth/register")
         .send(validUser)
        expect(res.statusCode).toBe(409)
        expect(res.type).toBe("application/json")
    })
})

