import { HaislError, TypeUtils }    from "@haisl-manager/api-interface";
import * as Joi                     from "@hapi/joi";
import { DotenvParseOutput, parse } from "dotenv";
import * as fs                      from "fs";
import { HaislObject }              from "../_haisl.object";


export interface EnvConfig
{
    [key: string]: string;
}

export enum NodeEnv
{
    Development,
    Production,
    Test,
    Provision
}


export class ConfigService extends HaislObject
{
    private readonly envConfig: EnvConfig;

    public get nodeEnv(): NodeEnv
    {
        return TypeUtils.stringToEnum(NodeEnv, this.envConfig.NODE_ENV) as unknown as NodeEnv;
    }

    public get jwtSecret(): string
    {
        return this.envConfig.JWT_SECRET;
    }

    public get port(): number
    {
        return Number(this.envConfig.PORT);
    }


    constructor(filePath: string | Buffer)
    {
        super();

        let data: Buffer;

        if (typeof filePath === "string")
            data = fs.readFileSync(filePath);
        else
            data = filePath;

        const config: DotenvParseOutput = parse(data);
        this.envConfig = this.validateInput(config);
    }


    // noinspection JSMethodCanBeStatic
    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig
    {
        const nodeEnvValidValues: string[] = TypeUtils.enumKeys(NodeEnv).map(key => key.toLowerCase());
        const nodeEnvDefault = TypeUtils.enumToString(NodeEnv, NodeEnv.Development).toLowerCase();

        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid([nodeEnvValidValues])
                .default(nodeEnvDefault),
            PORT: Joi.number()
                .default(3000),
            JWT_SECRET: Joi.string()
                .required()
        });

        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);

        if (error)
            throw new HaislError(`Config validation error: ${error.message}`);

        return validatedEnvConfig;
    }
}
