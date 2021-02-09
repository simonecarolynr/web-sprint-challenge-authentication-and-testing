const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

describe("Dad jokes tests", () => {
//test GET /
it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.type).toBe("application/json");
  });


//test GET /
it("GET /, if the user is not authenticated, they will not be let in", async () => {
    const res = await supertest(server)
     .get("/api/jokes")
    expect(res.statusCode).toBe(401)

})
})
