'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  BadgeCheck,
  UserRoundMinus,
  LogOut,
  SquareAsterisk,
  UserCog,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {ChangePasswordDialog} from "../profile/account/change-password-dialog";
import {DeleteAccountWarning} from "../profile/account/delete-account-warning";
import DeleteAccountDialog from "../profile/account/delete-account-dialog";

export default function ProfileMenu() {
  const t = useTranslations('nav');

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {userDataObj, currentUser, logout, authStatus} = useAuth();

  const authenticated =
    authStatus === "user" ||
    authStatus === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" size="icon-sm"
          className="rounded-full hover:bg-k-primary/10 p-6"
        >
          <Avatar className="h-8 w-8 transition duration-300 hover:scale-105">
            <AvatarImage src={userDataObj?.personal.photoUrl} />
            <AvatarFallback>
              {userDataObj?.username?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      } />
      <DropdownMenuContent
        align="end"
        // className="w-72"
        className='w-min'
      >
        {/* PROFILE */}
        {authenticated ? (
          <div className="mb-6 rounded-lg bg-linear-to-br from-k-primary to-k-primary/80 p-4 text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-white">
                <AvatarImage
                  src={userDataObj?.personal.photoUrl}
                />
                <AvatarFallback>
                  {userDataObj?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {userDataObj?.username}
                </h3>
                <p className="text-sm opacity-90">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-sm">
                {t('verifiedAccount')}
              </span>
            </div>
          </div>
        ) : (
          <div className="border-b p-5">
            <h3 className="font-semibold">
              {t('welcome')}
            </h3>
            <p className="text-sm text-muted-foreground">{t('signInToManageBookings')}</p>
          </div>
        )}
        <DropdownMenuGroup>

        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <UserCog className="mr-2 h-4 w-4" />
              {t('myProfile')}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup className='my-4 gap-6'>
          <DropdownMenuItem
            onClick={() => setPasswordDialogOpen(true)}
          >
            <SquareAsterisk
              className="mr-2 h-4 w-4"
            />
            {t("changePassword")}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setWarningOpen(true)}>
            <UserRoundMinus className="mr-2 h-4 w-4" />
            {t('deleteAccount')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        email={currentUser?.email ?? ""}
      />

      <DeleteAccountWarning
        open={warningOpen}
        onOpenChange={setWarningOpen}
        onContinue={() =>
          setDeleteDialogOpen(true)
        }
      />

      <DeleteAccountDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        userEmail={userDataObj?.email ?? "Unknown"}
      />
    </DropdownMenu>

  );
}