"use client";

import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const SignInComponent = ({ providers }: Props) => {
  return (
    <div className="flex justify-center">
      {Object.values(providers! as Object).map((provider) => (
        <div key={provider.id}>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign In With {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignInComponent;
