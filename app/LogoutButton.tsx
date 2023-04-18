"use client";
// we must use (use client) when you have an event handler function

import { signOut } from "next-auth/react";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
