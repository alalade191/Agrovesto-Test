import React, { useState } from "react";
import Link from "next/link";
import { FormEvent } from "react";
import { Loader, PasswordInput, clsx } from "@mantine/core";
import AuthLayout from "./auth-layout";
import InputField from "./input-field";
import { useMutation } from "@tanstack/react-query";
import { builder } from "@/builder";
import { toast } from "react-toastify";
import { cookieStorage } from "@ibnlanre/portal";
import { ErrorType, handleError } from "./handle-error";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      builder
        .use()
        .authentication.sign_in({ email: email, password: password }),
    mutationKey: builder.authentication.sign_in.get(),

    onSuccess(data) {
      toast.success("Sign in successfully");
      cookieStorage.setItem("email", email);
    },

    onError(error) {
      handleError(error as ErrorType);
    },
  });

  function handleSignin(e: FormEvent) {
    e.preventDefault();
    mutate();
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignin}
        className="flex flex-col items-center py-[30px] gap-[20px]"
      >
        <h3 className=" text-[#4A4C58] ont-switzer font-semibold text-2xl w-[386px]">
          Sign in
        </h3>

        <InputField
          onChange={(emailvalue) => {
            setEmail(emailvalue),
              emailvalue.length > 1 ? setDisabled(false) : setDisabled(true);
          }}
          id="email-input"
          htmlFor="email"
          label="Email Address"
          name="email"
          type="email"
          value={email}
          placeholder="Enter email address"
        />

        <PasswordInput
          placeholder="••••••••"
          id="password-input"
          label="Password"
          description=""
          withAsterisk
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value),
              event.currentTarget.value.length > 1
                ? setDisabled(false)
                : setDisabled(true);
          }}
          // required
          classNames={{
            root: "!focus:outline !focus:outline-0",
            label: "text-[16px] text-[#4A4C58]",
            input:
              "!h-[54px] !w-[386px] !mt-[20px]  !rounded-[8px] !outline-none !border-[#F0F0F1] !border !font-switzer !pl-[15px] !outline !outline-0 !focus:outline-0",
            innerInput:
              "!self-center !focus:outline-0 !h-full outline active:outline-0",
          }}
        />

        <Link
          href="/forget-password"
          className="text-base font-semibold font-switzer text-[#BF2018] w-[386px] ont-switzer text-end"
        >
          Forgot Password?
        </Link>
        <button
          disabled={disabled}
          type="submit"
          id="submit-button"
          className={clsx(
            disabled
              ? " w-[386px] h-[54px] rounded-[8px] cursor-pointer bg-[#a9706c]  text-white text-center font-switzer font-bold"
              : ` w-[386px] h-[54px] rounded-[8px] cursor-pointer bg-[#BF2018]  text-white text-center font-switzer font-bold hover:bg-[#65110D]`
          )}
        >
          {isLoading ? (
            <span className="flex gap-2 items-center justify-center">
              Sigining in <Loader size="sm" />
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-16 font-normal text-[#030229] pt-8">
          Don’t have account yet?{"  "}
          <Link
            href={"/sign-up"}
            className="text-base font-semibold font-switzer text-[#BF2018]"
          >
            New Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
export default Login;
