import { Message }    from "@haisl-manager/api-interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService
{
    public getData(): Message
    {
        return { message: "Welcome to api!" };
    }
}
