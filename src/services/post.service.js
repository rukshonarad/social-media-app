import { prisma } from "../prisma/index.js";

import { CustomError } from "../utils/custom-error.js";

class PostService {
    create = async (input) => {
        const story = await prisma.post.create({
            data: input
        });
        return story;
    };
}

export const postService = new PostService();
