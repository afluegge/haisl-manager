export class HaislError extends Error
{
    public readonly innerError: any;

    /**
     * Creates a new <code>HaislError</code> object.
     *
     * @param message   A summary message briefly describing the error.
     * @param innerError
     */
    constructor(message: string, innerError?: any)
    {
        super(message);
        this.innerError = innerError;
    }
}
