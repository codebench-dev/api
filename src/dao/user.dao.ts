import {PrismaClient} from "@prisma/client";

export class UserDao {

    static async createUser(user: { password: string; email: string; username: string }) {
        const prisma = new PrismaClient();

        try {
            return await prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: user.password
                },
            });
        } catch (e) {
            if (e.code === 'P2002')
            return {message: "This username or email already taken"}
        }
    }

    static async getAll() {
        const prisma = new PrismaClient();
        return await prisma.user.findMany();
    }

    static async getByEmail(email: string) {
        const prisma = new PrismaClient();
        return await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
    }
}
