import { HaislError } from "../haisl-error";

export class TypeUtils
{
    /**
     *Returns a list of all enum keys.
     *
     * @param enumeration  The enumeration for which to return a list of keys.
     *
     * @returns The list of enumeration keys.
     *
     * @throws GpxError  Thrown if the passed in object is not an enumeration.
     */
    public static enumKeys(enumeration: any): string[]
    {
        if (!TypeUtils.isEnum(enumeration))
            throw new HaislError("Not an enum");

        return Object.keys(enumeration)
        // Filter out all numerical representations of the enum keys...
            .filter(k => typeof (enumeration[k]) === "number");
    }

    /**
     * Returns the numerical value of an enumerations key with the passed in string representation.
     *
     * @param enumeration  The enumeration for which to return the number representation of the passed in key.
     * @param key          The enumeration keys string representation.
     *
     * @returns The number representation of the enum key with the provided name.
     *
     * @throws GpxError  Thrown if the passed in object is not an enumeration.
     * @throws GpxError  Thrown if the passed in key does not exist in the enumeration.
     */
    public static stringToEnum<TEnum>(enumeration: TEnum, key: string): TEnum
    {
        if (!TypeUtils.isEnum(enumeration))
            throw new HaislError("Not an enum");

        const foundKey = Object.keys(enumeration)
            .filter(k => typeof enumeration[k] === "number")
            .find(k => k.toLowerCase() === key.toLowerCase());

        if (foundKey === undefined)
            throw new HaislError(`Unknown enum key: ${key}`);

        return enumeration[foundKey];
    }

    /**
     * Returns the string representation of an enumeration value.
     *
     * @param enumeration  The enumeration for which to return the string representation of the passed in numerical key.
     * @param key          The enumerations numerical representation of the enum key.
     *
     * @returns The string representation of the numerical enum key.
     *
     * @throws GpxError  Thrown if the passed in object is not an enumeration.
     * @throws GpxError  Thrown if the passed in key does not exist in the enumeration.
     */
    public static enumToString(enumeration: any, key: number): string
    {
        if (!TypeUtils.isEnum(enumeration))
            throw new HaislError("Not an enum");

        if (!TypeUtils.isEnumKey(enumeration, key))
            throw new HaislError(`Unknown enum key: ${key}`);

        return enumeration[key];
    }

    /**
     * Tests if thge provided enumeration key exist in the provided enumeration.
     *
     * @param enumeration  The enumeratioon to check.
     * @param key          The key to check.
     *
     * @returns `true` if the enumeration contains the provided key.
     *
     * @throws GpxError  Thrown if the passed in object is not an enumeration.
     */
    public static isEnumKey(enumeration: any, key: string | number): boolean
    {
        if (!TypeUtils.isEnum(enumeration))
            throw new HaislError("Not an enum");

        return enumeration.hasOwnProperty(key);
    }

    /**
     * Checks if the provided object is an enumeration.
     *
     * @returns `true` if the provided object represents an enumeration.
     *
     * @param obj  The object to check.
     */
    public static isEnum(obj: any): boolean
    {
        // ToDo: Make this enum check more realistic and stable...

        const enumKeys: string[] = Object.keys(obj);

        // Naive check if passed in object is an enum...
        return enumKeys.length > 0;
    }

    /**
     * Converts an integer Color to RGB value
     *
     * @param intColor
     *
     * @returns  A tuple containing [red, green, blue] values.
     */
    public static intToRGB(intColor: number): [number, number, number]
    {
        const blue: number = intColor / 65536;
        const green: number = (intColor - blue * 65536) / 256;
        const red: number = intColor - blue * 65536 - green * 256;

        return [red, green, blue];
    }

    /**
     * Converts an integer Color to ARGB value
     *
     * @param intColor
     *
     * @returns  A tuple containing [alpha, red, green, blue] values.
     */
    public static intToARGB(intColor: number): [number, number, number, number]
    {
        const alpha: number = (intColor >> 24) & 0xFF;
        const red: number = (intColor >> 16) & 0xFF;
        const green: number = (intColor >> 8) & 0xFF;
        const blue: number = intColor & 0xFF;


        return [alpha, red, green, blue];
    }

    public static intColorToCssRgbaColor(intColor: number): string
    {
        const [alpha, red, green, blue] = TypeUtils.intToARGB(intColor);
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    public static getTranslatableEnumValueName(enumeration: any, enumValue: any): string
    {
        return `${TypeUtils.enumToString(enumeration, enumValue).toLowerCase()}`;
    }

    public static capitalizeWords(text: string): string
    {
        return text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }
}
