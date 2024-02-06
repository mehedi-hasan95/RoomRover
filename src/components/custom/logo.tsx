import { Bed } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-x-1 text-2xl font-bold">
      <Bed className="text-rose-500" /> RoomRover
    </Link>
  );
};

export default Logo;
