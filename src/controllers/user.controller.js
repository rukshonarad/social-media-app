import { userService } from "../services/user.service.js";
import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
class UserController {
    signUp = catchAsync(async (req, res) => {
        const { body } = req;

        const userInput = {
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            dateOfBirth: body.dateOfBirth,
            password: body.password,
            currentPlace: body.currentPlace,
            education: body.education,
            workExperience: body.workExperience,
            bio: body.bio
        };
        await userService.signUp(userInput);
        res.status(201).json({
            message: "Success"
        });
    });
    login = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            password: body.password
        };

        const jwt = await userService.login(input);
        res.status(200).json({
            token: jwt
        });
    });

    activate = catchAsync(async (req, res) => {
        const {
            query: { activationToken }
        } = req;

        if (!activationToken) {
            throw new CustomError("Activation Token is missing", 400);
        }

        await userService.activate(activationToken);

        res.status(200).json({
            message: "Success"
        });
    });
    forgotPassword = catchAsync(async (req, res) => {
        const {
            body: { email }
        } = req;
        await userService.forgotPassword(email);

        res.status(200).json({
            message: "Password reset email has been sent"
        });
    });

    resetPassword = catchAsync(async (req, res) => {
        const {
            body: { password, passwordConfirm },
            headers
        } = req;
        if (!password || !passwordConfirm) {
            throw new CustomError(
                "Both Password and Pasword Confirmation are required",
                400
            );
        }

        if (password !== passwordConfirm) {
            throw new CustomError(
                "Password and Password Confirmation does not match",
                400
            );
        }
        if (!headers.authorization) {
            throw new CustomError("Password Reset Token is missing", 400);
        }

        const [bearer, token] = headers.authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw new CustomError("Invalid Password Reset Token", 400);
        }

        await userService.resetPassword(token, password);
        res.status(200).json({
            message: "Password successfully updated"
        });
    });
    changePassword = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            password: body.password,
            newPassword: body.newPassword,
            newPasswordConfirm: body.newPasswordConfirm
        };

        if (!body.password || !body.newPassword || !body.newPasswordConfirm)
            throw new CustomError(
                "All fields are required: Current Password, New Password and New Password Confirmation",
                400
            );

        if (body.newPassword !== body.newPasswordConfirm)
            throw new CustomError(
                "Password and Password Confirm does not match",
                400
            );

        await userService.changePassword(req.userId, input);

        res.status(200).json({
            message: "Password successfully updated!"
        });
    });
    // changePassword = catchAsync(async (req, res) => {
    //     const {
    //         body: { newPassword, newPasswordConfirm }
    //     } = req;
    //     if (!newPassword || !newPasswordConfirm) {
    //         throw new CustomError(
    //             "All Password and Pasword Confirmation are required",
    //             400
    //         );
    //     }
    //     if (newPassword !== newPasswordConfirm) {
    //         throw new CustomError(
    //             "Password and Password Confirmation does not match",
    //             400
    //         );
    //     }

    //     await userService.changePassword(newPassword, req.userId);
    //     res.status(200).json({
    //         message: "Password successfully updated"
    //     });
    // });
    getMe = catchAsync(async (req, res) => {
        const { userId } = req;
        const me = await userService.getMe(userId);

        res.status(200).json({
            data: me
        });
    });

    updateProfile = catchAsync(async (req, res) => {
        const {
            email,
            firstName,
            lastName,
            currentPlace,
            education,
            workExperience
        } = req.body;

        const userInput = {
            email,
            firstName,
            lastName,
            currentPlace,
            education,
            workExperience
        };

        await userService.updateProfile(userInput, req.userId);

        res.status(200).json({
            message: "Profile was updated successfully!"
        });
    });
}
export const userController = new UserController();
