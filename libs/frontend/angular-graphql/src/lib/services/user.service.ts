import { Injectable }        from "@angular/core";
import { IUser }             from "@haisl-manager/api-interface";
import { Apollo }            from "apollo-angular";
import { ApolloQueryResult } from "apollo-client";
import gql                   from "graphql-tag";
import { map, take }               from "rxjs/operators";

export const GET_USERS_QUERY = gql`
            query GetUsers($skip: Int, $take: Int) {
                allUsers(skip: $skip, take: $take) {
                    id
                    username
                    firstName
                    lastName
                    email
                    notes
                    locked
                    roles {
                        name
                        description
                    }
                    modified
                    created
                }
            }
        `;

@Injectable({
    providedIn: "root"
})
export class UserService
{
    constructor(private apollo: Apollo)
    {
    }

    public getUsersAsync(skipCount?: number, takeCount?: number): Promise<IUser[]>
    {
        return this.apollo
            .query({
                query: GET_USERS_QUERY,
                variables: {
                    skip: skipCount,
                    take: takeCount
                }
            })
            .pipe(
                map((result: ApolloQueryResult<IUser>) =>
                {
                    return result.data as unknown as IUser[];
                })
            )
            .toPromise();
    }

    public getUser(userName: string): IUser | undefined
    {
        return undefined;
    }
}
