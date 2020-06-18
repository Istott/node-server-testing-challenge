const supertest = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

it("should user the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
});

describe("server.js", () => {
    beforeEach(async () => {
        await db("family").truncate();
    });

    describe("GET /", () => {
        it("should return 200 OK", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    // jest assertion
                    expect(res.status).toBe(200);
                });
        });

        it("should return api: up", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    // jest assertion
                    expect(res.body.api).toBe("up");
                    expect(res.body).toEqual({ api: "up" });
                });
        });

        it("should return JSON", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    // jest assertion
                    expect(res.type).toMatch(/json/i);
                });
        });
    });

    describe("POST /family", () => {
        it("should post a new family name", () => {
            const name = "Uhtred";

            return supertest(server)
                .post("/family")
                .send({ name })
                .then(res => {
                    expect(res.body.name).toBe(name);
                });
        });
    });

    describe("POST /family", () => {
        it("should add multiple family names", async () => {
            const family = [{ name: "bob" }, { name: "hazel" }];

            await supertest(server).post("/family").send(family);

            let allFamilynames = await supertest(server).get("/family");
            expect(allFamilynames.body).toHaveLength(2);

            await supertest(server).post("/family").send({ name: "rose" });

            allFamilynames = await supertest(server).get("/family");
            expect(allFamilynames.body).toHaveLength(3);
        });
    });
});
