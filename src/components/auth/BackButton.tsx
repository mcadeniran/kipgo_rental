'use client';

import {Link} from "@/i18n/navigation";
import {Button} from "../ui/button";

export const BackButton = ({label, href}: {label: string; href: string;}) => {
  return <Button variant='link' size='sm' className='font-normal w-full'>
    <Link href={href}>
      {label}
    </Link>
  </Button>;
};