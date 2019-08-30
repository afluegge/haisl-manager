import { CommonModule }                 from "@angular/common";
import { HttpClientModule }             from "@angular/common/http";
import { NgModule }                     from "@angular/core";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink, HttpLinkModule }     from "apollo-angular-link-http";
import { InMemoryCache }                from "apollo-cache-inmemory";

@NgModule({
    imports:   [
        CommonModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    providers: [
        {
            provide:    APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) =>
                        {
                            return {
                                cache: new InMemoryCache(),
                                link:  httpLink.create({
                                    uri: "http://localhost:3333/graphql"
                                })
                            };
                        },
            deps:       [HttpLink]
        }
    ]
})
export class AngularGraphqlModule
{
}
