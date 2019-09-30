import { ContainerModule } from "inversify";
import { Repository, Connection } from "typeorm";

import { IUsersService } from "./Contracts/IUsersService"
import { UsersService } from "./Services/UsersService"
import { User } from "./ORM/User";
import "./Controllers/UsersController"

export const module = new ContainerModule(bind => {

    bind<Repository<User>>("Repository<User>").toDynamicValue(context => {
        
        let connection = context.container.get<Connection>("Connection")

        let repository = connection.getRepository(User)

        return repository
    })

    bind<IUsersService>("IUsersService").to(UsersService)
})