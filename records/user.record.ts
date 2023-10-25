import {UserEntity} from "../types/user-entity";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
const salt = 10;


interface NewUserEntity extends Omit<UserEntity,'id'> {
    id?: string;
}

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
    public id: string;
    public username: string;
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
        this.password = obj.password;
    }

    static async getOne (id: string): Promise<UserRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE id = :id", {
            id,
        }) as UserRecordResults;

        return results.length === 0 ? null : new UserRecord(results[0])
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted');
        }

        // console.log(this.password, 'password before converting')

        // hashing password by bycript
        this.password = await new Promise((resolve, reject) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });

        // throw new Error('omg what happend');

        // console.log(this.password, 'password after convert');
        // console.log(this.id, 'id');
        // console.log(this);

        await pool.execute("INSERT INTO `users`(`id`,`username`,`hashpassword`) VALUES(:id, :username, :password)", this)
    }
}