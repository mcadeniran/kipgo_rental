'use client';

import {useEffect, useRef, useState} from "react";
import {Loader2, Smartphone} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import {InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";
import {markPhoneVerified} from "@/lib/services/profile-service";
import useAuth from "@/context/AuthContext";
import {toast} from "sonner";
import {confirmPhoneOTP, sendPhoneOTP} from "@/lib/services/phoneVerificationService";
import {RecaptchaVerifier} from "firebase/auth";
import {auth} from "@/app/[locale]/firebase/config";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VerifyPhoneDialog({open, onOpenChange, }: Props) {
  const {currentUser, userDataObj, refreshProfile, } = useAuth();
  const [otp, setOtp] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingExpiry, setRemainingExpiry] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const MAX_RESENDS = 5;

  const canResend =
    resendCooldown === 0 &&
    resendCount < MAX_RESENDS;

  const phone = userDataObj?.personal.phone ?? "";
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    async function initializeRecaptcha() {
      if (verifierRef.current) return;
      verifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      await verifierRef.current.render();
      if (mounted) {
        await sendCode();
      }
    }

    void initializeRecaptcha();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (
      otp.length === 6 &&
      !isVerifying &&
      remainingExpiry > 0
    ) {
      void verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);


  useEffect(() => {
    if (!expiresAt) return;
    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000)
      );
      setRemainingExpiry(remaining);
      if (remaining === 0) {
        clearInterval(timer);
        toast.error(
          "Verification code expired."
        );
        setOtp("");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  useEffect(() => {
    if (open) return;
    verifierRef.current?.clear();
    verifierRef.current = null;
  }, [open]);

  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setInterval(() => {
      setResendCooldown((value) => value - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  async function sendCode() {
    if (!phone) return;
    try {
      setIsSending(true);

      if (!verifierRef.current) {
        throw new Error("reCAPTCHA not initialized.");
      }

      await sendPhoneOTP(phone, verifierRef.current,);

      setResendCooldown(60);

      setExpiresAt(Date.now() + 5 * 60 * 1000);

      setResendCount((c) => c + 1);

      setOtp("");

      toast.success("Verification code sent.");

    } catch (e) {
      console.error(e);
      toast.error("Unable to send verification code.");
    } finally {
      setIsSending(false);
    }
  }

  async function verify() {
    if (!currentUser)
      return;

    if (remainingExpiry === 0 &&
      remainingExpiry !== 0) {

      toast.error("Verification code expired.");
      return;
    }

    try {
      setIsVerifying(true);
      await confirmPhoneOTP(otp);
      await markPhoneVerified(currentUser.uid);
      await refreshProfile();
      onOpenChange(false);
      toast.success("Phone verified successfully.");
      onOpenChange(false);
    } catch (e) {
      console.error(e);
      toast.error("Invalid verification code.");
    } finally {
      setIsVerifying(false);
    }
  }

  return (

    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setOtp("");
          setExpiresAt(null);
          setResendCooldown(0);
          setResendCount(0);
          setRemainingExpiry(0);
        }
        onOpenChange(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <Smartphone className="mx-auto h-12 w-12 text-k-primary" />
          <DialogTitle className="text-center">
            Verify Phone Number
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter the 6-digit code sent to
            <br />
            <strong>{maskPhoneNumber(phone)}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            disabled={
              isSending ||
              isVerifying ||
              remainingExpiry === 0
            }
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {remainingExpiry > 0 ? (
          <p>
            {`Code expires in ${Math.floor(
              remainingExpiry / 60
            )}:${String(
              remainingExpiry % 60
            ).padStart(2, "0")}`}
          </p>
        ) : (
          <Button
            variant="link"
            onClick={sendCode}
          >
            Code expired.
            Send another code
          </Button>
        )}

        <Button
          onClick={verify}
          disabled={
            otp.length !== 6 ||
            isSending ||
            isVerifying ||
            remainingExpiry === 0
          }
        >
          {isVerifying ? (
            <Loader2 className="animate-spin" />
          ) : ("Verify")}
        </Button>

        <Button
          variant="outline"
          onClick={sendCode}
          disabled={
            !canResend ||
            isSending ||
            isVerifying
          }
        >
          {isSending ? (<Loader2 className="animate-spin" />)
            : resendCount >= MAX_RESENDS ?
              "Maximum attempts reached"
              : resendCooldown > 0 ?
                `Resend in ${resendCooldown}s`
                :
                "Resend Code"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function maskPhoneNumber(phone: string): string {
  if (phone.length < 7) return phone;

  return `${phone.slice(0, 4)} ••• •${phone.slice(-3)}`;
}