import { compare, hash }                                                                     from "bcrypt";
import { Cipher, createCipheriv, createDecipheriv, createHash, Decipher, Hash, randomBytes } from "crypto";

export class CryptoHelper
{
    public static hashPassword(password: string): Promise<string>
    {
        return hash(password, 10);
    }

    public static checkHash(password: string, hashedValue: string): Promise<boolean>
    {
        return compare(password, hashedValue);
    }


    public static encryptString(plainText: string, secret: string): string
    {
        if (!plainText || plainText.length === 0)
            return plainText;

        if (!secret || secret.length === 0)
            throw new Error("you must pass a secret");

        const key = CryptoHelper.generateKey(secret);

        // Generates 16 byte cryptographically strong pseudo-random data as IV
        // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
        const ivBytes: Buffer = randomBytes(16);
        const ivText: string = ivBytes.toString("base64");

        // encrypt using aes256 iv + key + plainText = encryptedText
        const cipher: Cipher = createCipheriv("aes-256-cbc", key, ivBytes);
        let encryptedValue: string = cipher.update(plainText, "utf8", "base64");
        encryptedValue += cipher.final("base64");

        // store base64(ivBytes)!base64(encryptedValue)
        return `${ivText}!${encryptedValue}`;
    }

    public static decryptString(encryptedValue: string, secret: string): string
    {
        if (!encryptedValue || encryptedValue.length === 0)
            return encryptedValue;

        if (!secret || secret.length === 0)
            throw new Error("you must pass a secret");

        // enrypted value = base64(ivBytes)!base64(encryptedValue)
        const parts: string[] = encryptedValue.split("!");

        if (parts.length !== 2)
            throw new Error("The encrypted value is not a valid format");

        const ivText: string = parts[0];
        const encryptedText: string = parts[1];

        const ivBytes: Buffer = Buffer.from(ivText, "base64");
        const key = CryptoHelper.generateKey(secret);

        if (ivBytes.length !== 16)
            throw new Error("The encrypted value is not a valid format");

        if (key.length !== 32)
            throw new Error("The secret is not valid format");

        // decrypt using aes256 iv + key + encryptedText = decryptedText
        const decipher: Decipher = createDecipheriv("aes-256-cbc", key, ivBytes);
        let value: string = decipher.update(encryptedText, "base64", "utf8");
        value += decipher.final("utf8");

        return value;
    }

    private static generateKey(secret: string): string
    {
        const hash: Hash = createHash("sha256");
        hash.update(secret);
        const key: string = hash.digest("base64");

        return key.substr(0, 32);
    }
}
