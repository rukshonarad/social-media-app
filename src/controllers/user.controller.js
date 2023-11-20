import { userService } from "..services/userService.js";

class UserController {
    signUp = catchAsync(async (req, res) => {
        const { body } = req;

        const userInput = {
            email: body.email,
            preferredFirstName: body.preferredName,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password
        };
        await userService.signUp(userInput);
        res.status(201).json({
            message: "Success"
        });
    });
}
