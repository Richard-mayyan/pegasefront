import {
  ConfirmAccountDto,
  IAuthRepo,
  LoginResult,
  ResendCodeDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "@/logic/domain/repos/AuthRepo";
import { apiClient } from "./axios";
import { RegisterDto, UserDto } from "./dtos";
import { UserEntity } from "@/logic/domain/entities";
import { InMemoryCommunityRepo } from "../inmemory/InMemoryCommunityRepo";
import { classRepo } from "../../di/container";

export class NodeAuthRepo implements IAuthRepo {
  getCurrentUser(): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  async login(data: { email: string; password: string }): Promise<LoginResult> {
    const res = await apiClient.post("/auth/login", data);
    return res.data.data;
  }

  async register(data: RegisterDto): Promise<UserEntity> {
    const res = await apiClient.post("/auth/register", data);
    return res.data.data;
  }

  async confirmAccountWithCode(data: ConfirmAccountDto): Promise<UserEntity> {
    const res = await apiClient.post("/auth/confirm-email", data);
    return res.data.data;
  }

  async resendCode(data: ResendCodeDto): Promise<void> {
    await apiClient.post("/auth/request-email-verification", data);
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<void> {
    await apiClient.post("/auth/forgot-password", data);
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    await apiClient.post("/auth/reset-password", data);
  }

  async getProfile(): Promise<UserEntity> {
    const res = await apiClient.get("/user/me");
    // const communities = await new InMemoryCommunityRepo().findAll();
    // const classes = await classRepo.findAll(communities[0].id || "");
    // return {
    //   ...res.data.data,
    //   communities: communities.map((v) => ({ ...v, classes: classes })),
    // };
    return { ...res.data.data };
  }
}
