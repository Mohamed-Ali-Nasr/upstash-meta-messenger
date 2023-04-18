import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  const session = await getServerSession();

  if (session)
    return (
      <header className="sticky top-0 z-50 flex items-center justify-between p-10 bg-white shadow-sm">
        <div className="flex space-x-2">
          <Image
            src={session.user?.image!}
            alt="profile picture"
            height={10}
            width={50}
            className="object-contain mx-2 rounded-full"
          />

          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="text-lg font-bold">{session.user?.name}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center p-10 bg-white shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-2">
          <Image
            src="https://links.papareact.com/jne"
            alt="logo"
            height={10}
            width={50}
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signin"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
