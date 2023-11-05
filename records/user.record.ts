import {UserEntity} from "../types/user-entity";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';

const salt = 10;

interface NewUserEntity extends Omit<UserEntity, 'id'> {
    id?: string;
}

export type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
    public id: string;
    public username: string;
    public email: string;
    public password: string;

    constructor(obj: NewUserEntity) {
        if (!obj.username || obj.username.length > 15 || obj.username.length < 3) {
            throw new ValidationError('Username has to have between 3 and 15 letters');
        }
        if (!obj.password || obj.password.length > 15 || obj.password.length < 4) {
            throw new ValidationError('Password has to have between 3 and 15 letters');
        }

        this.id = obj.id;
        this.username = obj.username;
        this.email = obj.email;
        this.password = obj.password;

    }

    static async checkIfExists(username: string): Promise<any | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE username = :username", {
            username,
        }) as UserRecordResults;

        return !(results[0] === undefined);
    }

    static async checkIfJWTExists(jwt: string): Promise<any | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE tokenid = :jwt", {
            jwt,
        }) as UserRecordResults;

        return results[0];
    }

    static async getOne(username: string): Promise<any | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE username = :username", {
            username,
        }) as UserRecordResults;

        if (results[0] === undefined) {
            throw new ValidationError('incorrect username');
        }

        return results.length === 0 ? null : results[0];
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted');
        }

        this.password = await bcrypt.hash(this.password, 10);

        await pool.execute("INSERT INTO `users`(`id`,`username`,`email`, `hashpassword`) VALUES(:id, :username, :email, :password)", this)
    }

    static async update(newtoken: string, username: string): Promise<void> {

        await pool.execute("UPDATE `users` SET tokenid = :newtoken WHERE username = :username", {
            newtoken,
            username,
        });
    }

    static async startNewGame(username: string, game: string) {

        await pool.execute("UPDATE `users` SET game = :game WHERE username = :username", {
            game,
            username,
        });
    };
}