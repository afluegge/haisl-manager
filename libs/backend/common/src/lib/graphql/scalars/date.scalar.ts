import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind }                 from "graphql";
import { HaislObject }          from "../../_haisl.object";
import { SentryService }        from "../../services/sentry.service";

@Scalar("Date", () => Date)
export class DateScalar extends HaislObject implements CustomScalar<string, Date>
{
    description = "Date custom scalar type";

    constructor(sentry: SentryService)
    {
        super(sentry);
    }

    parseValue(value: string): Date
    {
        return new Date(value); // value from the client
    }

    serialize(value: Date): string
    {
        return value.toJSON(); // value sent to the client
    }

    parseLiteral(ast: any): Date
    {
        if (ast.kind === Kind.STRING)
            return new Date(ast.value);

        return null;
    }
}
