import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signup')
    userSignup(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
        if (name && email && password)
            return this.usersService.userSignUp({ name, email, password })
        else
            return { message: 'User details not found.' }
    }

    @Post('login')
    userLogin(@Body('email') email: string, @Body('password') password: string) {
        if (email && password)
            return this.usersService.userLogin({ email, password })
        else
            return { message: 'User details not found.' }
    }
}
