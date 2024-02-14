import Link from "next/link";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { TbMessageCircleBolt } from "react-icons/tb";
import { Button } from "@/components/ui/button";

export function MessageButton() {
  return (
    <Link href="#">
      <Button variant="icon" size="icon">
        <BiSolidMessageSquareDetail size={21} />
        {/* <TbMessageCircleBolt size={21} /> */}
      </Button>
    </Link>
  );
}
