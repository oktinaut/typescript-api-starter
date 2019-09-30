import { Observable } from "rxjs"

import { IUser } from "./IUser"

export interface IUsersService {

    getById(id: string): Observable<IUser>

    getAll(): Observable<IUser[]>

    create(user: Omit<IUser, "id">): Observable<IUser>

    update(user: IUser): Observable<IUser>

    delete(userID: string): Observable<void>
}