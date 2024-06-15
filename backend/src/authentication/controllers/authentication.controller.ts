import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import RequestWithUser from '../interfaces/request-with-user-interface';
import { UsersService } from 'src/users/services/users.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';
import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
import JwtRefreshGuard from '../guards/jwt-refresh.guard';
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() userData: CreateUserDto) {
    return this.authenticationService.signUp(userData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('sign-in')
  async signIn(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { user } = request;
    const accessToken = this.authenticationService.getAccessToken(user.id);
    const refreshToken = this.authenticationService.getRefreshToken(user.id);
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(accessToken);
    const refreshTokenCookie =
      this.authenticationService.getCookieWithJwtRefreshToken(refreshToken);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    response.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getUser(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessToken = this.authenticationService.getAccessToken(
      request.user.id,
    );
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(accessToken);

    request.res?.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('sign-out')
  async signOut(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    await this.usersService.removeRefreshToken(request.user.id);
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForSignOut(),
    );
    return response.sendStatus(200);
  }
}
