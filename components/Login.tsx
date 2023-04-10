"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#11A37F] min-h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="chatgpt logo"
      />
      <button
        className="flex items-center space-x-2 p-4 rounded-full bg-white text-[#11A37F] text-2xl font-semibold"
        onClick={() => signIn("google")}
      >
        <Image
          src="/img/google-logo.svg"
          width={30}
          height={30}
          alt="google logo"
        />
        <span>Sign In with Google</span>
      </button>
    </div>
  );
}

export default Login;
