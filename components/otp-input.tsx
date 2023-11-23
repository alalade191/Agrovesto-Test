import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader, PinInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import { useMutation } from "@tanstack/react-query";
import { builder } from "@/builder";
import { cookieStorage } from "@ibnlanre/portal";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "./handle-error";

const Otp: React.FC = () => {
  const { push } = useRouter();
  const [pin, setPIn] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      builder.use().authentication.otp_pin({
        otp: pin,
        email: cookieStorage.getItem("email") || "",
      }),
    mutationKey: builder.authentication.otp_pin.get(),
    onSuccess(data, variables, context) {
      toast.success("Enter your new password");
      push("/reset-password");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  function handleVerifyPin(e: FormEvent) {
    e.preventDefault();
    mutate();
  }
  return (
    <AuthLayout>
      <form
        onSubmit={handleVerifyPin}
        className="flex flex-col items-center py-[30px] gap-[20px]"
      >
        <h3 className="text-[#BF2018] pb-[15px] font-semibold text-2xl text-center w-[386px]">
          Agrovesto
        </h3>

        <div className="flex flex-col gap-[20px]">
          <h3 className="font-semibold text-2xl font-switzer text-[#5E606A] text-center leading-[33px]">
            Forgot password?
          </h3>
          <p className="font-normal text-base text-center text-[#8F9198] font-switzer w-[386px] max-w-[350px]">
            Kindly enter the 6-digit pin sent to your email address provider
          </p>
        </div>

        <div>
          <PinInput
            value={pin}
            id="pin-input"
            onChange={setPIn}
            type="number"
            size="xl"
            styles={{
              root: {
                width: "340px",
                justifyContent: "space-between",
              },
              wrapper: {
                flex: 1,
              },
            }}
            sx={{
              width: "340px",
              gap: "12px",
            }}
            placeholder=""
            oneTimeCode
            aria-label="One time code"
            mask
            length={6}
            required
          />
        </div>

        <button
          type="submit"
          id="submit-button"
          className="w-[386px] h-[54px] rounded-[8px] bg-[#BF2018] text-white text-center font-switzer font-bold hover:bg-[#65110D]"
        >
          {isLoading ? (
            <span className="flex gap-2 items-center justify-center">
              Submitting <Loader size="sm" />
            </span>
          ) : (
            "Submit"
          )}
        </button>
        <div className="font-normal text-base text-center text-[#8F9198] font-switzer w-[386px]">
          Cant find 6-digit pin?{" "}
          <span className="text-[#BF2018] font-semi-bold cursor-pointer">
            Resend pin?
          </span>
        </div>

        <div className="font-normal text-base text-center text-[#8F9198] font-switzer w-[386px]">
          Network Error?{" "}
          <span
            onClick={() => push(`reset-password`)}
            className="text-[#BF2018] font-semi-bold cursor-pointer"
          >
            Reset password
          </span>
        </div>
        <div className="flex items-center gap-3 pt-[12px]">
          <figure>
            <Image
              height={20}
              width={20}
              src={"/images/breadcrumb.svg"}
              alt="breadcrumb"
            />
          </figure>
          <span className="font-semibold font-switzer text-[#5E606A] ">
            <Link href="/login">Back to Sign in</Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};
export default Otp;
