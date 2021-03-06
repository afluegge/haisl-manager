import { HaislError, IEntity }                                                   from "@haisl-manager/api-interface";
import { FindConditions, FindManyOptions, FindOneOptions, ObjectID, Repository } from "typeorm";


export abstract class RepositoryMock<TEntity extends IEntity> extends Repository<TEntity>
{
    private readonly _mockData: TEntity[];


    protected constructor(mockData: TEntity[])
    {
        super();
        this._mockData = mockData;
    }


    public find(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<TEntity[]>
    {
        let result: TEntity[] = this._mockData;

        if (options && Object.keys(options).length > 0)
        {
            if (this.isFindManyOptions(options))
            {
                if (options.skip && options.skip > 0)
                    result = this._mockData.slice(options.skip);

                if (options.take && options.take > 0)
                    result = result.slice(0, options.take);
            }
            else
            {
                throw new HaislError("--- Not Implemented ---");
            }
        }

        return Promise.resolve(result);
    }

    public findOne(idOptionsConditions?: string | number | Date | ObjectID | FindOneOptions<TEntity> | FindConditions<TEntity>, optionsConditions?: FindOneOptions<TEntity> | FindConditions<TEntity>, options?: FindOneOptions<TEntity>): Promise<TEntity | undefined>
    {
        if (idOptionsConditions)
        {
            if (this.isFindOneOptions(idOptionsConditions))
            {
                // ToDo: Implement functionality...
            }
            else
            {
                throw new HaislError("--- Not Implemented ---");
            }
        }

        return undefined;
    }


    private isFindManyOptions(options: FindManyOptions<TEntity> | FindConditions<TEntity>): options is FindManyOptions<TEntity>
    {
        const testObj = (options as FindManyOptions<TEntity>);

        return !(testObj.skip === undefined && testObj.take === undefined && testObj.relations === undefined);


    }

    private isFindOneOptions(options: string | number | Date | ObjectID | FindOneOptions<TEntity> | FindConditions<TEntity>): options is FindOneOptions<TEntity>
    {
        const testObj = (options as FindOneOptions<TEntity>);

        if (testObj.where === undefined)
        {
            if (testObj.select === undefined)
                return false;
        }

        return true;
    }

    protected getNextId(): number
    {
        return Math.max.apply(Math, this._mockData.map(function(o) { return o.id; }));
    }
}
