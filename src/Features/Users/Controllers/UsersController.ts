import { inject } from "inversify";
import { Route, Controller, Get, Post, Body, SuccessResponse, Put, Delete } from "tsoa"

import { IUser } from "../Contracts/IUser";
import { IUsersService } from "../Contracts/IUsersService";
import { provide } from "inversify-binding-decorators";

interface UserData {
    username: string
    password: string
}

@provide(UsersController)
@Route("users")
export class UsersController extends Controller {

    @inject("IUsersService")
    private service: IUsersService
    
    @Get()
    async getAll(): Promise<IUser[]> {
        
        let users = await this.service.getAll().toPromise()

        return users
    }

    @Get("{id}")
    async getById(id: string): Promise<IUser> {

        let user = await this.service.getById(id).toPromise()

        return user
    }

    @SuccessResponse(201, "Created")
    @Post()
    async create(@Body() userData: UserData): Promise<IUser> {

        let createdUser = await this.service.create(userData as IUser).toPromise()

        this.setStatus(201)

        return createdUser
    }

    @Put("{id}")
    async update(id: string, @Body() userData: UserData): Promise<IUser> {

        let user = Object.assign({}, userData, { id }) as IUser

        let updatedUser = await this.service.update(user).toPromise()

        return updatedUser
    }

    @Delete("{id}")
    async delete(id: string): Promise<void> {
        await this.service.delete(id).toPromise()
    }
}