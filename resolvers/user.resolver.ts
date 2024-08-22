import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from "md5";

export const resolversUser = {
    Query: {
        getUser: async (_: any, args: any, context) => {
            const tokenVerify = context.tokenVerify;

            const infoUser = await User.findOne({
                token: tokenVerify,
                deleted: false
            });

            if (!infoUser) {
                return { code: 400, message: "Token không hợp lệ!" }
            }
            return {
                code: 200,
                message: "Thành công!",
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            }
        }
    },

    Mutation: {
        registerUser: async (_: any, args: any) => {
            const { user } = args;

            const existUser = await User.findOne({
                email: user.email,
                deleted: false
            });

            if (existUser) {
                return { code: 400, message: "Email đã tồn tại!" }
            }
            user.password = md5(user.password);
            user.token = generateRandomString(20);

            const newUser = new User(user);
            const data = await newUser.save();

            return {
                code: 200,
                message: "Đăng ký tài khoản thành công!",
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                token: data.token
            };

        },
        loginUser: async (_: any, args: any) => {
            const { user } = args;

            const infoUser = await User.findOne({
                email: user.email,
                password: md5(user.password),
                deleted: false
            });

            if (!infoUser) {
                return { code: 400, message: "Email hoặc mật khẩu không chính xác!" }
            }

            return {
                code: 200,
                message: "Thành công!",
                token: infoUser.token
            }
        }
    }
}