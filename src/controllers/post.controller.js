import { catchAsync } from "../utils/catch-async.js";

import { CustomError } from "../utils/custom-error.js";
import { postService } from "../services/post.service.js";
class PostController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            content: body.content,
            comments: body.comments
        };

        if (!input.content) throw new CustomError("Content is required", 400);

        const post = await postService.create(input, userId);

        res.status(200).json({
            data: post
        });
    });
}
export const postController = new PostController();
