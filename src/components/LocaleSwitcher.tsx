'use client';

import {Check} from "lucide-react";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {CircleFlag} from "react-circle-flags";
import {
  Avatar
} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

const LANGUAGES = [
  {
    code: "en",
    name: "English",
    flag: <CircleFlag countryCode="gb" height="16" />,
  },
  {
    code: "tr",
    name: "Türkçe",
    flag: <CircleFlag countryCode="tr" height="16" />,
  },
  {
    code: "ru",
    name: "Русский",
    flag: <CircleFlag countryCode="ru" height="16" />,
  },
] as const;

export default function LocaleSwitcher() {

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const current =
    LANGUAGES.find(
      l => l.code === locale
    ) ?? LANGUAGES[0];

  function changeLocale(
    code: string
  ) {

    if (code === locale) return;

    router.replace(pathname, {
      locale: code,
    });

    router.refresh();

  }

  return (

    <DropdownMenu>

      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            className="rounded-full transition-all duration-300 hover:bg-k-primary/10 hover:scale-105">
            {/* <Avatar >
            </Avatar> */}
            {current.flag}
          </Button>
        }
      />
      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        {
          LANGUAGES.map(language => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLocale(language.code)}
              className="cursor-pointer"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    {language.flag}
                  </Avatar>
                  <span>
                    {language.name}
                  </span>
                </div>
                {
                  locale === language.code && (
                    <Check
                      className="h-4 w-4 text-k-primary"
                    />
                  )
                }
              </div>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}