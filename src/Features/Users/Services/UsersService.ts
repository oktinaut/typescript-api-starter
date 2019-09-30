import { inject, injectable } from "inversify"
import { from, Observable, throwError } from "rxjs"
import { flatMap, map } from "rxjs/operators"
import { Repository } from "typeorm"

import { IUsersService } from "../Contracts/IUsersService"
import { IUser } from "../Contracts/IUser"
import { User } from "../ORM/User"

@injectable()
export class UsersService implements IUsersService {

    @inject("Repository<User>")
    private repository: Repository<User>

    getById(id: string): Observable<IUser> {
        
        let user = from(this.repository.findOne(id))

        return user
    }    
    
    getAll(): Observable<IUser[]> {

        let users = from(this.repository.find())

        return users
    }

    create(user: Omit<IUser, "id">): Observable<IUser> {

        let entity = this.repository.create(user)
        let createdUser = from(this.repository.save(entity))

        return createdUser
    }

    update(user: IUser): Observable<IUser> {

        let updatedUser = from(this.repository.update(user.id, user)).pipe(
            flatMap(_ => this.repository.findOne(user.id))
        )

        return updatedUser
    }

    delete(userID: string): Observable<void> {

        let result = from(this.repository.delete(userID)).pipe(
            map(_ => {})
        )

        return result
    }
}