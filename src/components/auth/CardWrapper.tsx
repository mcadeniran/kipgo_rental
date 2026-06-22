'use client';

import {Card, CardContent, CardFooter, CardHeader} from "../ui/card";
import {BackButton} from "./BackButton";
import {Header} from "./Header";
import {Social} from "./Social";

interface CardWrapperProps {
  children: React.ReactNode,
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string,
  showSocials?: boolean;
}

export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref, showSocials}: CardWrapperProps) => {
  return <Card className="w-100 shadow-md">
    <CardHeader>
      <Header label={headerLabel} />
    </CardHeader>
    <CardContent>{children}</CardContent>
    {
      showSocials && <CardFooter>
        <Social />
      </CardFooter>
    }
    <CardFooter>
      <BackButton label={backButtonLabel} href={backButtonHref} />
    </CardFooter>
  </Card>;
};