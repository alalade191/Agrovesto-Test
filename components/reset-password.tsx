import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Loader, PasswordInput, clsx } from "@mantine/core";
import AuthLayout from "./auth-layout";
import { useMutation } from "@tanstack/react-query";
import { builder } from "@/builder";
import { cookieStorage } from "@ibnlanre/portal";
import { toast } from "react-toastify";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { push } = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      builder.use().authentication.change_password({
        email: cookieStorage.getItem("email") || "",
        new_password: password,
        confirm_password: confirmpassword,
      }),
    mutationKey: builder.authentication.change_password.get(),
    onSuccess(data, variables, context) {
      toast.success("Enter your credentials");
      push("/login");
    },
    onError(error) {
      toast.error("There's an error");
    },
  });

  function handleNewPassword(e: FormEvent) {
    e.preventDefault();

    mutate();
  }
  return (
    <AuthLayout>
      <form
        onSubmit={handleNewPassword}
        className="flex flex-col items-center gap-[20px] py-[20px]"
      >
        <h3 className="text-[#BF2018] font-semibold text-2xl text-center">
          Agrovesto
        </h3>

        <div className="flex flex-col gap-[20px]">
          <h3 className="font-semibold text-2xl font-switzer text-[#5E606A] text-center">
            Reset password?
          </h3>
          <p className="font-normal text-base text-center text-[#8F9198] font-switzer w-[386px]">
            Kindly provide a new password for your account.
          </p>
        </div>

        <PasswordInput
          id="password-input"
          type="password"
          placeholder="Enter your new password"
          label="New Password"
          description=""
          withAsterisk
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value),
              event.currentTarget.value.length > 1
                ? setDisabled(false)
                : setDisabled(true);
          }}
          required
          classNames={{
            root: "!focus:outline !focus:outline-0",
            label: "text-[16px] text-[#4A4C58]",
            input:
              "!h-[54px] !w-[386px] !mt-[20px]  !rounded-[8px] !outline-none !border-[#F0F0F1] !border !font-switzer !pl-[15px] !outline !outline-0 !focus:outline-0",
            innerInput:
              "!self-center !focus:outline-0 !h-full outline active:outline-0",
          }}
        />

        <PasswordInput
          id="password-input"
          type="password"
          placeholder="Re enter your new password"
          label="Confirm Password"
          description=""
          withAsterisk
          value={confirmpassword}
          onChange={(event) => {
            setConfirmpassword(event.currentTarget.value),
              event.currentTarget.value.length > 1
                ? setDisabled(false)
                : setDisabled(true);
          }}
          required
          classNames={{
            root: "!focus:outline !focus:outline-0",
            label: "text-[16px] text-[#4A4C58]",
            input:
              "!h-[54px] !w-[386px] !mt-[20px]  !rounded-[8px] !outline-none !border-[#F0F0F1] !border !font-switzer !pl-[15px] !outline !outline-0 !focus:outline-0",
            innerInput:
              "!self-center !focus:outline-0 !h-full outline active:outline-0",
          }}
        />

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
              Resetting <Loader size="sm" />
            </span>
          ) : (
            "Reset"
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
            onClick={() => push(`/login`)}
            className="font-semibold font-switzer text-[#5E606A] "
          >
            Back to Sign in
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};
export default ResetPassword;
