import { prisma } from "../prisma/index.js";

import { CustomError } from "../utils/custom-error.js";

class PostService {
    create = async (input, userId) => {
        const post = await prisma.post.create({
            data: {
                ...input,
                userId: userId
            }
        });
        return post;
    };
}

export const postService = new PostService();
