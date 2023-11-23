import Image from "next/image";
import React from "react";

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="w-screen bg-[url('/images/background.png')] bg-no-repeat bg-cover h-screen object-cover flex flex-col">
        <header className="pt-[30px] bg-transparent w-[90%] mx-auto">
          <figure className="w-[100px] h-[29px]">
            <Image
              height={50}
              width={50}
              src="https://www.agrovesto.com/_next/static/media/plogo.b1b5b697.svg"
              alt="login-logo"
              className="w-full h-full"
            />
          </figure>
        </header>
        <div className="w-[90%] mx-auto flex flex-1 justify-center items-center">
          <section className="flex items-center justify-center gap-[4vw] ">
            <article className="w-[531px] my-auto">
              <figure className="w-[309px] h-[300px] mx-auto">
                <Image
                  height={300}
                  width={309}
                  src={"/images/login-image.png"}
                  alt="login"
                  className="w-full h-full"
                  objectFit="contain"
                />
              </figure>
              <div className="pt-[30px]">
                <h2 className="font-semibold text-2xl ont-switzer text-center text-[#5E606A] leading-[33px]">
                  Streamline your Login Experience with us{" "}
                </h2>
                <p className="font-normal text-base text-center text-[#8F9198] font-switzer leading-[22px]">
                  Welcome to our Single Sign-On login page! With just one set of
                  login credential.
                </p>
              </div>
            </article>

            <div
              style={{ boxShadow: "0px 4px 44px 0px rgba(0, 0, 0, 0.16)" }}
              className="w-[466px] bg-white rounded-2xl my-[50px]"
            >
              {children}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AuthLayout;
