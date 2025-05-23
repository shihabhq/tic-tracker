import { getUser } from "@/utils/server";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./logoutButton";

const Navbar = async () => {
  const user = await getUser();

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between  items-center">
      <div className="w-[1280px]  flex justify-between items-center mx-auto ">
        <div className="flex text-2xl items-center gap-2 font-bold">
          <Image width={40} height={40} src={"/logo.png"} alt="" />
          Tic Tracker
        </div>
        <div>
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              className="bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold py-2 px-4 rounded"
              href={"/login"}
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
