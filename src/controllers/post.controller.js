import { catchAsync } from "../utils/catch-async.js";

import { CustomError } from "../utils/custom-error.js";
import { postService } from "../services/post.service.js";
class PostController {
    create = catchAsync(async (req, res) => {
        const {
            body: { content, userId, comment }
        } = req;

        const input = {
            content,
            userId,
            comment
        };
        const post = await postService.create(input);
        res.status(200).json({ data: post });
    });
}
export const postController = new PostController();
