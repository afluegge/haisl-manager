import { HaislError, IUser }                           from "@haisl-manager/api-interface";
import { HaislObject, SentryCategory, SentryService }  from "@haisl-manager/backend/common";
import { Injectable }                                  from "@nestjs/common";
import { InjectRepository }                            from "@nestjs/typeorm";
import { Severity }                                    from "@sentry/types";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { User }                                        from "./entities/user.entity";
import { IUserService }                                from "./user.service.interface";

@Injectable()
export class UserService extends HaislObject implements IUserService
{
    public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, sentry: SentryService)
    {
        super(sentry);

        // Sample on how to capture exceptions in service constructors
        //
        // try
        // {
        //     const a: any = {};
        //     a.boom();
        // }
        // catch (e)
        // {
        //     const error = new HaislError("This is a sample exception", e);
        //     this.logger.error(error);
        //     sentry.captureException(error);
        //     sentry.flush();
        // }
    }


    public async getAllUsers(skip?: number, take?: number): Promise<IUser[]>
    {
        this.sentry.addBreadcrumb("Repository: Getting all Users", Severity.Debug, SentryCategory.Repository);

        if (skip && skip < 0)
        {
            const ex = new HaislError(`Invalid skip value: ${skip}`);
            this.logger.error(ex);
            this.sentry.captureException(ex);
            throw ex;
        }

        if (take && take < 0)
        {
            const ex = new HaislError(`Invalid take value: ${take}`);
            this.logger.error(ex);
            this.sentry.captureException(ex);
            throw ex;
        }

        const findOptions: FindManyOptions = { relations: ["roles"] };

        if (skip)
            findOptions.skip = skip;

        if (take)
            findOptions.take = take;

        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const users: User[] = await this.userRepository.find(findOptions);
        return users;
    }

    public async getUserById(id: number): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Getting User by Id", Severity.Debug, SentryCategory.Repository);

        const findOptions: FindOneOptions =
            {
                relations: ["roles"],
                where: {
                    id
                }
            };

        return await this.userRepository.findOne(findOptions);
    }

    public async getUserByUsername(username: string): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Getting User by Username", Severity.Debug, SentryCategory.Repository);

        if (!username || username.length <= 0)
        {
            const message = "Missing username";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        const findOptions: FindOneOptions =
            {
                relations: ["roles"],
                where: {
                    username
                }
            };

        return await this.userRepository.findOne(findOptions);
    }

    public async getUserByUsernamePwdHash(username: string, pwdHash: string): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Getting User by Username and Password Hash", Severity.Debug, SentryCategory.Repository);

        if (!username || username.length <= 0)
        {
            const message = "Missing username";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        const findOptions: FindOneOptions =
            {
                relations: ["roles"],
                where: {
                    username,
                    password: pwdHash
                }
            };

        return await this.userRepository.findOne(findOptions);
    }

    public async getUserByEmailPwdHash(email: string, pwdHash: string): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Getting User by eMail and Password Hash", Severity.Debug, SentryCategory.Repository);

        if (!email || email.length <= 0)
        {
            const message = "Missing email";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        const findOptions: FindOneOptions =
            {
                relations: ["roles"],
                where: {
                    email,
                    password: pwdHash
                }
            };

        return await this.userRepository.findOne(findOptions);
    }

    public async getUserByEmail(email: string): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Getting User by eMail", Severity.Debug, SentryCategory.Repository);

        if (!email || email.length <= 0)
        {
            const message = "Missing email";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        const findOptions: FindOneOptions =
            {
                relations: ["roles"],
                where: {
                    email
                }
            };

        return await this.userRepository.findOne(findOptions);
    }

    public async addUser(newUser: IUser): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Adding new User", Severity.Debug, SentryCategory.Repository);

        if (!newUser)
        {
            const message = "Missing new user";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        return await this.userRepository.save(newUser);
    }

    public async modifyUser(changedUser: IUser): Promise<IUser>
    {
        this.sentry.addBreadcrumb("Modifying User", Severity.Debug, SentryCategory.Repository);

        if (!changedUser)
        {
            const message = "Missing changed user";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        await this.userRepository.update(changedUser.id, changedUser);

        return await this.getUserById(changedUser.id);
    }

    public async removeUser(user: IUser | IUser[]): Promise<void>
    {
        this.sentry.addBreadcrumb("Removing User", Severity.Debug, SentryCategory.Repository);

        if (!user || (user instanceof Array && user.length <= 0) || (user instanceof String && user.length <= 0))
        {
            const message = "Missing users";
            this.logger.warn(message);
            this.sentry.captureMessage(message, Severity.Warning);
            return Promise.resolve(undefined);
        }

        let usersToRemove: User[] = [];

        if (user instanceof Array)
            usersToRemove = user;
        else
            usersToRemove.push(user);

        await this.userRepository.remove(usersToRemove);
    }
}
