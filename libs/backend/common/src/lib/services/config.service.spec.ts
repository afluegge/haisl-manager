import { ConfigService, NodeEnv } from "./config.service";

describe("ConfigService", () =>
{
    it("should parse env file", () =>
    {
        const data = Buffer.from("NODE_ENV=development\n" +
            "PORT=4711\n" +
            "JWT_SECRET=Hallodri");

        const configService = new ConfigService(data);
        expect(configService.jwtSecret).toBe("Hallodri");
        expect(configService.port).toBe(4711);
    });

    it("should return default value", () =>
    {
        const data = Buffer.from("JWT_SECRET=Hallodri");

        const configService = new ConfigService(data);
        expect(configService.port).toBe(3000);
        expect(configService.nodeEnv).toBe(NodeEnv.Development);
    });

    it("should fail on illegal property value type", () =>
    {
        const data = Buffer.from("NODE_ENV=development\n" +
            "PORT=XX4711\n" +
            "JWT_SECRET=Hallodri");

        const test = () =>
        {
            const configService = new ConfigService(data);
        };

        expect(test).toThrowError();
    });

    it("should fail on missing property definition", () =>
    {
        const data = Buffer.from("NODE_ENV=development\n" +
            "PORT=4711");

        const test = () =>
        {
            const configService = new ConfigService(data);
        };

        expect(test).toThrowError();
    });
});
