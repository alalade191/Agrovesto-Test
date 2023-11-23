import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputField from "./input-field";
import { Loader, clsx } from "@mantine/core";
import AuthLayout from "./auth-layout";
import { useMutation } from "@tanstack/react-query";
import { builder } from "@/builder";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "./handle-error";

const UserForgetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { push } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      builder.use().authentication.forgot_password({ email: email }),
    mutationKey: builder.authentication.forgot_password.get(),
    onSuccess(data, variables, context) {
      toast.success("Check your email for your OTP pin");
      push("/otp-input");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  function handleForgotPassword(e: FormEvent) {
    e.preventDefault();
    mutate();
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col items-center py-[30px] gap-[20px]"
      >
        <h3 className="pb-[15px] text-[#BF2018] font-semibold text-2xl text-center w-[386px]">
          Agrovesto
        </h3>

        <div className="flex flex-col gap-[20px]">
          <h3 className="font-semibold text-2xl font-switzer text-[#5E606A] text-center">
            Forgot password?
          </h3>
          <p className="font-normal text-base text-center text-[#8F9198] font-switzer w-[386px]">
            Enter your email address below, and we will email you a 6-digit pin
            to reset your password
          </p>
        </div>

        <InputField
          id="email-input"
          htmlFor="email"
          value={email}
          label=""
          onChange={(emailvalue) => {
            setEmail(emailvalue),
              emailvalue.length > 1 ? setDisabled(false) : setDisabled(true);
          }}
          name="email"
          type="email"
          placeholder="Enter email address"
        />

        <button
          type="submit"
          disabled={disabled}
          id="submit-button"
          className={clsx(
            disabled
              ? " w-[386px] h-[54px] rounded-[8px] cursor-pointer bg-[#a9706c]  text-white text-center font-switzer font-bold"
              : ` w-[386px] h-[54px] rounded-[8px] cursor-pointer bg-[#BF2018]  text-white text-center font-switzer font-bold hover:bg-[#65110D]`
          )}
        >
          {isLoading ? (
            <span className="flex gap-2 items-center justify-center">
              Submitting <Loader size="sm" />
            </span>
          ) : (
            "Submit"
          )}
        </button>

        <div className="flex items-center gap-3 pt-[12px]">
          <figure>
            <Image
              height={20}
              width={20}
              src={"/images/breadcrumb.svg"}
              alt="breadcrumb"
            />
          </figure>
          <span
            onClick={() => push("/login")}
            className="font-semibold font-switzer text-[#5E606A] "
          >
            Back to Sign in
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};
export default UserForgetPassword;
