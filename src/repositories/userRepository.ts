import { User } from "@prisma/client";

type CreateUserData = Omit<User, "id">

export async function create(userData: CreateUserData){
    
}