import React, { useState, useContext, FormEvent } from "react";
import Link from "next/link";
import { Loader, PasswordInput, clsx } from "@mantine/core";
import AuthLayout from "./auth-layout";
import InputField from "./input-field";
import { useMutation } from "@tanstack/react-query";
import { builder } from "@/builder";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ErrorType, handleError } from "./handle-error";

const SignUp: React.FC = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      builder.use().authentication.sign_up({
        full_name: fullname,
        username: username,
        email: email,
        password: password,
      }),
    mutationKey: builder.authentication.sign_up.get(),
    onSuccess(data, variables, context) {
      toast.success("Yuppy! You just sign up");
      push("/login");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  function handleSignup(e: FormEvent) {
    e.preventDefault();
    mutate();
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center py-[10px] gap-[12px]"
      >
        <h3 className=" text-[#4A4C58] ont-switzer font-semibold text-2xl w-[386px]">
          Sign up
        </h3>

        <InputField
          onChange={(fullnamevalue) => {
            setFullname(fullnamevalue),
              fullnamevalue.length > 1 ? setDisabled(false) : setDisabled(true);
          }}
          id="username-input"
          htmlFor="username-input"
          label="Full Name"
          name="text"
          type="text"
          value={fullname}
          placeholder="Enter your fullname"
        />

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

        <InputField
          onChange={(usernamevalue) => {
            setUsername(usernamevalue),
              usernamevalue.length > 1 ? setDisabled(false) : setDisabled(true);
          }}
          id="username-input"
          htmlFor="email"
          label="Username"
          name="text"
          type="text"
          value={username}
          placeholder="Enter email address"
        />

        <PasswordInput
          placeholder="••••••••"
          id="password-input"
          type="password"
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
          required
          classNames={{
            root: "!focus:outline !focus:outline-0",
            label: "text-[16px] text-[#4A4C58]",
            input:
              "!h-[54px] !w-[386px] !mt-[15px]  !rounded-[8px] !outline-none !border-[#F0F0F1] !border !font-switzer !pl-[15px] !outline !outline-0 !focus:outline-0",
            innerInput:
              "!self-center !focus:outline-0 !h-full outline active:outline-0",
          }}
        />

        <button
          type="submit"
          id="submit-button"
          disabled={disabled}
          className={clsx(
            disabled
              ? " w-[386px] h-[54px] rounded-[8px] cursor-pointer bg-[#a9706c]  text-white text-center font-switzer font-bold"
              : ` w-[386px] h-[54px] rounded-[8px] cursor-pointer bg-[#BF2018]  text-white text-center font-switzer font-bold hover:bg-[#65110D]`
          )}
        >
          {isLoading ? (
            <span className="flex gap-2 items-center justify-center">
              Sigining up <Loader size="sm" />
            </span>
          ) : (
            "Sign up"
          )}
        </button>

        <span className="font-semibold font-switzer text-[#5E606A] ">
          <Link href="/login">Back to Sign in</Link>
        </span>
      </form>
    </AuthLayout>
  );
};
export default SignUp;
