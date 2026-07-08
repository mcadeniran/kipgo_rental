'use client';

import {useState} from "react";
import {BadgeCheck, ShieldAlert, } from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import VerifyPhoneDialog from "./VerifyPhoneDialog";

export default function PhoneVerificationCard() {
  const {userDataObj} = useAuth();
  const [open, setOpen] = useState(false);

  const verified = userDataObj?.personal.isPhoneVerified;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Phone Verification
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
              <Badge>
                <BadgeCheck className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            ) : (
              <Badge
                variant="secondary"
              >
                <ShieldAlert className="mr-1 h-3 w-3" />
                Not Verified
              </Badge>
            )}
          </div>

          {!verified && (
            <Button
              onClick={() =>
                setOpen(true)
              }
            >
              Verify
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