import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default class User {
    id: number;
    email: string;
    name: string;
    password: string;
 
    constructor(id: number, email: string, name: string, password: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }
    public static async fromEmail(email: string) {
        const result = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(!result) throw Error("User not found");
        return new User(result.id, result.email, result.username, result.password);
    }
    public static async fromId(id: number) {
        const result = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if(!result) throw Error("User not found");
        return new User(result.id, result.email, result.username, result.password);
    }
    
    public static async register(email: string, name: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await prisma.user.create({
            data: {
                email: email,
                username: name,
                password: hashedPassword
            }
        });
        return new User(result.id, result.email, result.username, result.password);
    };
    public static async login(email: string, password: string) {
        const user = await this.fromEmail(email);
        const result = await bcrypt.compare(password, user.password);
        if(result) return user;
        else throw Error("Password incorrect");
    }
    public static async setNotificationToken(id: number, token: string) {
        const result = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                notificationToken: token
            }
        });
        return result;
    }
}