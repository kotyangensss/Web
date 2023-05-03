import { user } from '@prisma/client';
import { UserInfoDto } from './dto/userInfoDto';
import { UserCreateDto } from './dto/user.create.dto';

export class UserTransformer {
  static userToUserInfoDto(user: user): UserInfoDto {
    return new UserInfoDto(
      user.userId,
      user.email,
      user.name,
      user.bio,
      user.user_type,
      user.profilePic,
      user.created.toString(),
    );
  }

  static fieldsToUserCreateDto(fields, profilePic): UserCreateDto {
    return new UserCreateDto(
      fields.email,
      fields.name,
      fields.bio,
      fields.type,
      profilePic,
    );
  }
}
