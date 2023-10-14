import { Body, Controller, Post, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { SignUpDto, UserLoginDto } from "./dto/auth.dto"
@ApiTags("Auth")
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post("/login")
  login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }

  @ApiConsumes('multipart/form-data')
  @HttpCode(200)
  @Post("/signup")
  @UseInterceptors(
    FileInterceptor(
      'avatar', // Tham số 1: key FE gửi lên
      {
        // Tham số 2: định nghĩa nơi lưu, và lưu tên mới cho file
        storage: diskStorage({
          destination: process.cwd() + '/public/avatar',
          filename: (req, file, callback) =>
            callback(null, new Date().getTime() + '_' + file.originalname), // null: tham số báo lỗi
        }),
      },
    ),
  )
  signUp(@Body() body: SignUpDto, @UploadedFile() file: Express.Multer.File,) {

    return this.authService.signUp(body, file);

  }
}
