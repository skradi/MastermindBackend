export interface UserEntity {
    id: string,
    username: string,
    email: string,
    password: string,
}

export interface UserEntityDB {
    id: string,
    username: string,
    email: string,
    hashpassword: string,
    tokenid: string,
}