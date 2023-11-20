import { prisma } from "../prisma/index.js";
import { crypto } from "../utils/crypto.js";
import { bcrypt } from "../utils/bcrypt.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { mailer } from "../utils/mailer.js";

class UserService {
    signUp = async (userInput) => {
        const hashedPassword = await bcrypt.hash(userInput.password);
        const activationToken = crypto.createToken();
        const hashedActivationToken = crypto.hash(activationToken);
        const user = await prisma.user.create({
            data: {
                ...userInput,
                password: hashedPassword,
                activationToken: hashedActivationToken
            },
            select: {
                id: true
            }
        });

        await mailer.sendActivationMail(userInput.email, activationToken);
    };
}
export const userService = new UserService();
