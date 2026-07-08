import logo from '../.././../public/logo.png';
import Image from "next/image";
interface HeaderProps {
  label: string;
}

export const Header = ({label}: HeaderProps) => {
  return <div className="w-full flex flex-col gap-y-4 items-center justify-center">
    <Image src={logo} alt="logo" width={50} height={50} className="w-12.5 h-auto overflow-hidden rounded-full" />
    <h1 className="text-k-primary">{label}</h1>
  </div>;
};