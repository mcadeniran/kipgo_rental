'use client';

import {useState} from "react";
import {BadgeCheck, ShieldAlert, } from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import VerifyPhoneDialog from "./VerifyPhoneDialog";
import {useTranslations} from "next-intl";

export default function PhoneVerificationCard() {
  const t = useTranslations('profile');

  const {userDataObj} = useAuth();
  const [open, setOpen] = useState(false);

  const verified = userDataObj?.personal.isPhoneVerified;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {t('phoneVerification')}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              {
                userDataObj?.personal
                  .phone
              }
            </p>

            {verified ? (
              <Badge className=" bg-k-primary text-white">
                <BadgeCheck className="mr-1 h-3 w-3" />
                {t('verified')}
              </Badge>
            ) : (
              <Badge
                variant="secondary"
              >
                <ShieldAlert className="mr-1 h-3 w-3" />
                {t('notVerified')}
              </Badge>
            )}
          </div>

          {!verified && (
            <Button
              onClick={() =>
                setOpen(true)
              }
            >
              {t('verify')}
            </Button>
          )}
        </CardContent>
      </Card>

      <VerifyPhoneDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>

  );

}