import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="w-[1280px] text-2xl flex items-center gap-2 mx-auto font-bold">
        <Image width={40} height={40} src={"/logo.png"} alt="" />
        Tic Tracker
      </div>
    </nav>
  );
};

export default Navbar;
