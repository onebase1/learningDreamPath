import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      height={200}
      width={436}
      alt="logo"
      src="/logo.svg"
      className="h-[100px] w-[218px] md:h-[80px] md:w-[327px]"
      priority
    />
  );
};