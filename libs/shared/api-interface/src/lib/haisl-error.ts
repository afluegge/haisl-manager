export class HaislError extends Error
{
    /**
     * Creates a new <code>HaislError</code> object.
     *
     * @param message   A summary message briefly describing the error.
     */
    constructor(message: string)
    {
        super(message);
    }
}
