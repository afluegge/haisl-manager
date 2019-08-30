import { DotenvParseOutput } from "dotenv";
import * as dotenv           from "dotenv";
import * as fs               from "fs";
import * as Joi              from "@hapi/joi";


export interface EnvConfig
{
    [key: string]: string;
}


export class ConfigService
{
    private readonly envConfig: EnvConfig;


    constructor(filePath: string)
    {
        const config: DotenvParseOutput = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }


    public get jwtSecret(): string
    {
        return this.envConfig.JWT_SECRET;
    }


    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig
    {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV:         Joi.string()
                                 .valid(["development", "production", "test", "provision"])
                                 .default("development"),
            PORT:             Joi.number()
                                 .default(3000),
            JWT_SECRET:       Joi.string()
                                  .required()
        });

        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);

        if(error)
            throw new Error(`Config validation error: ${error.message}`);

        return validatedEnvConfig;
    }
}
