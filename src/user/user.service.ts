import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'src/utils/bcryt';
import { errorCode, successCode } from 'src/utils/customRes';

@Injectable()
export class UserService {
  model = new PrismaClient()
  create(createUserDto: CreateUserDto) {
    return this.model.users.create({
      data: createUserDto
    });
  }

  async findAll() {
    try {
      const data = await this.model.users.findMany({
        where: {
          isRemove: false || null

        }
      })
      return successCode(data)
    } catch (error) {
      return errorCode(error)
    }

  }

  async findOne(id: number) {
    return await this.model.users.findUnique({
      where: {
        UserID: id,
        isRemove: false || null

      }
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    let { Email, Username, Password } = updateUserDto
    return this.model.users.update({
      where: {
        UserID: id
      },
      data: {
        Email, Username, Password: hashPassword(Password)
      }
    })
  }

  async remove(id: number) {

    const checkId = await this.model.users.findUnique({
      where: {
        UserID: id

      }
    })
    if (!checkId) {
      return "tai khoan khong ton tai"
    }
    const passRemove = hashPassword("daXoa@1231")
    const remove = await this.model.users.update({
      where: {
        UserID: id
      },
      data: {
        Password: passRemove,
      }
    });

    return { status: "Xoa thanh cong", remove }
  }
}
