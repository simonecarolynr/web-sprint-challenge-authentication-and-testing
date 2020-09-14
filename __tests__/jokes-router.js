const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")
const { expectCt } = require("helmet")

describe("Dad jokes tests", () => {
//test GET /
it("GET /, if the user is authenticated it will return an array", async () => {


})


//test GET /
it("GET /, if the user is not authenticated, they will not be let in", async () => {
    const res = await supertest(server)
     .get("/api/jokes")
    expect(res.statusCode).toBe(401)

})
})
