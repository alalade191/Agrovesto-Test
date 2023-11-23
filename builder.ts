import { createBuilder } from "@ibnlanre/portal";
import { LOGINAPI } from "./api/axios-config";
import { ISignUp } from "./types";

export const builder = createBuilder({
  authentication: {
    sign_up: (data: {
      email: string;
      full_name: string;
      username: string;
      password: string;
    }) => LOGINAPI.post(`/api/auth/sign-up/`, data),

    sign_in: (data: { email: string; password: string }) =>
      LOGINAPI.post(`/api/auth/sign-in/`, data),

    forgot_password: (data: { email: string }) =>
      LOGINAPI.post(`/api/auth/recover-account/`, data),

    otp_pin: (data: { email: string; otp: string }) =>
      LOGINAPI.post(`/api/auth/validate-recovery-otp/`, data),

    change_password: (data: {
      email: string;
      new_password: string;
      confirm_password: string;
    }) => LOGINAPI.post(`/api/auth/change-password-recovery/`, data),
  },
});
