import { IsEmail, IsString, MinLength, IsIn} from "class-validator";

export class registerDto {
    @IsString()
    name!: string

    @IsEmail()
    email!: string
    
    @IsString()
    @MinLength(6)
    password!: string

    @IsString()
    @IsIn(['admin', 'user'])
    role!: string
}