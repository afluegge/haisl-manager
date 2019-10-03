export class Guid
{
    private static readonly emptyAsString = "00000000-0000-0000-0000-000000000000";
    private static readonly emptyGuid = new Guid(Guid.emptyAsString);
    private readonly value: string = Guid.emptyAsString;

    constructor(value?: string)
    {
        if (!(value === undefined || value === null))
        {
            if (Guid.isValid(value))
            {
                this.value = value;
            }
        }
    }

    public static get empty(): Guid
    {
        return this.emptyGuid;
    }

    public static newGuid(): Guid
    {
        return new Guid(
            "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c =>
            {
                // tslint:disable:no-bitwise
                const r = (Math.random() * 16) | 0;
                const v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            })
        );
    }

    public static isValid(str: string): boolean
    {
        const validRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return validRegex.test(str);
    }

    public toString()
    {
        return this.value;
    }

    public toJSON()
    {
        return this.value.toString();
    }

    public equals(value: any): boolean
    {
        return this.value === value.toString();
    }
}
