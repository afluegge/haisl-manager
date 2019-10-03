import { LoggerService, Optional } from "@nestjs/common";
import { isObject }                from "@nestjs/common/utils/shared.utils";
import * as clc                    from "cli-color";
import { HaislObject }             from "./_haisl.object";

declare const process: any;
const yellow = clc.xterm(3);

enum Level
{
    Log = "LOG",
    Error = "ERROR",
    Warn = "WARN",
    Debug = "DEBUG",
    Verbose = "VERBOSE"
}


export class HaislLogger extends HaislObject implements LoggerService
{
    private static lastTimestamp?: number;


    constructor(@Optional() private readonly context?: string, @Optional() private readonly isTimestampEnabled = false)
    {
        super();
    }


    public log(message: any, context = "", isTimeDiffEnabled = true)
    {
        this.printMessage(Level.Log, message, clc.green, context, isTimeDiffEnabled);
    }

    public error(message: any, trace = "", context = "", isTimeDiffEnabled = true)
    {
        this.printMessage(Level.Error, message, clc.red, context, isTimeDiffEnabled);
        this.printStackTrace(trace);
    }

    public warn(message: any, context = "", isTimeDiffEnabled = true)
    {
        this.printMessage(Level.Warn, message, clc.yellow, context, isTimeDiffEnabled);
    }

    public debug(message: any, context = "", isTimeDiffEnabled = true)
    {
        this.printMessage(Level.Debug, message, clc.magentaBright, context, isTimeDiffEnabled);
    }

    public verbose(message: any, context = "", isTimeDiffEnabled = true)
    {
        this.printMessage(Level.Verbose, message, clc.cyanBright, context, isTimeDiffEnabled);
    }


    private printError(err: any, indent: number, level: number = 0): string
    {
        const indentCount = indent * level;
        const stacktrace: string[] = err.stack.split("\n");
        let output = "";

        stacktrace.forEach((stackpart: string) =>
        {
            output += `${" ".repeat(indentCount)}${stackpart}\n`;
        });

        if (err.innerError !== undefined)
            output += `\nInnerError:\n${this.printError(err.innerError, indent, level + 1)}`;

        return output;
    }

    private printMessage(level: Level, message: any, color: (message: string) => string, context: string = "", isTimeDiffEnabled?: boolean)
    {
        let output = `${color("Object:")}\n`;

        if (isObject(message))
        {
            if (message instanceof Error)
            {
                output += `${color(this.printError(message, 4))}`;
            }
            else
            {
                output += `${color(JSON.stringify(message, null, 2))}\n`;
            }
        }
        else
        {
            output = `${color(message)}`;
        }

        const localeStringOptions = {
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            millisecond: "numeric",
            day: "2-digit",
            month: "2-digit"
        };

        const rightNow = new Date(Date.now());
        const timestamp: string = (rightNow.toLocaleString(undefined, localeStringOptions) + "." + rightNow.getMilliseconds()).padEnd(23);

        process.stdout.write(color(`[HaislManager] ${process.pid.toString().padStart(6)}   ${timestamp}   ${level.toString().padEnd(7)} `));
        context && process.stdout.write(yellow(` [${context}]   `));
        process.stdout.write(output);

        this.printTimestamp(isTimeDiffEnabled);

        process.stdout.write(`\n`);
    }

    // noinspection JSMethodCanBeStatic
    private printTimestamp(isTimeDiffEnabled?: boolean)
    {
        const includeTimestamp = HaislLogger.lastTimestamp && isTimeDiffEnabled;

        if (includeTimestamp)
            process.stdout.write(yellow(` +${Date.now() - HaislLogger.lastTimestamp}ms`));

        HaislLogger.lastTimestamp = Date.now();
    }

    // noinspection JSMethodCanBeStatic
    private printStackTrace(trace: string)
    {
        if (!trace)
            return;

        process.stdout.write(trace);
        process.stdout.write(`\n`);
    }
}
