import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { deCodePassword, hashPassword } from 'src/utils/bcryt';
import { validateEmail } from 'src/utils/validateEmail';
import { SignUpDto, UserLoginDto } from "./dto/auth.dto"
import { uploadImageAvatar } from 'src/utils/cloudinary';
import { unlink } from 'fs/promises';



@Injectable()
export class AuthService {

    constructor(

        private jwtService: JwtService,

    ) { }

    model = new PrismaClient();

    async login(body: UserLoginDto) {
        let { Email, Password } = body;
        let isEmail = validateEmail(Email)
        let checkEmail = await this.model.users.findFirst({
            where: {
                Email: Email.toLowerCase()
            }
        })
        let checkPass = deCodePassword(Password, checkEmail.Password)
        let checkRemove = deCodePassword("daXoa@1231", checkEmail.Password)

        if (!isEmail) {
            return "Không đúng định dạng email"
        }

        // kiểm tra Email trùng
        if (!checkEmail) {
            return "Email không tồn tại!!"
        }

        // trùng Email => kiểm tra tiếp password
        if (checkRemove) {
            return "Tài khoản đang trong tiến trình xóa khỏi hệ thống!! Vui lòng thử lại"
        }
        if (!checkPass) {
            return "Mật khẩu không chính xác"
        }



        let token = this.jwtService.sign({ data: checkEmail }, { expiresIn: "50m", secret: "!@#QWE123qwe" });
        return {
            status: "Thành công",
            statusCode: "200",
            Token: token
        };

    }

    async signUp(body: SignUpDto, file: any) {

        let { Username, Email, Password, Age, role } = body;
        let isEmail = validateEmail(Email)
        // kiểm tra Email trùng
        let checkEmail = await this.model.users.findFirst({
            where: {
                Email: Email.toLowerCase()
            }
        })
        if (!isEmail) {
            return "Không đúng định dạng email"
        }
        // trùng => báo Email trùng
        if (checkEmail) {
            return "Email đã tồn tại!"
        }
        let urlAvatar: string = ""
        if (file !== undefined && file !== null) {
            const upCloud: any = await uploadImageAvatar(`./public/img/${file.filename}`)
            urlAvatar = upCloud.url
        }
        // ko trùng => thêm mới Users
        let pass_word = hashPassword(Password).toString()
        let createUSer = await this.model.users.create({

            data: { Username, Email, Password: pass_word, Age: Number(Age), avatar: urlAvatar, role }
        })
        if (file !== undefined && file !== null) {
            await unlink(process.cwd() + `/public/img/${file.filename}`);
        }
        return {
            status: "Thành công",
            respon: createUSer
        }

    }
}
