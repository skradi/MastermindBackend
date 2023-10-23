import {UserEntity} from "../types/user-entity";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

interface NewUserEntity extends Omit<UserEntity,'id'> {
    id?: string;
}

type UserRecordResults = [UserEntity[], FieldPacket[]];


export class UserRecord implements UserEntity {
    public email: string;
    public id: string;
    public nickname: string;
    public password: string;

    constructor(obj: NewUserEntity) {
        this.email = obj.email;
        this.nickname = obj.nickname;
        this.id = obj.id;
        this.password = obj.password;
    }

    static async getOne (id: string): Promise<UserRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE id = :id", {
            id,
        }) as UserRecordResults;

        return results.length === 0 ? null : new UserRecord(results[0])
    }


}