'use client';

import {useEffect, useState} from "react";
import {Loader, MailCheck} from "lucide-react";
import {CardWrapper} from "./CardWrapper";
import useAuth from "@/context/AuthContext";
import {Button} from "../ui/button";
import {FormSuccess} from "../general/FormSuccess";
import {FormError} from "../general/FormError";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {Translator} from "@/schemas/create-schema";

export const VerifyEmailCard = () => {
  const {currentUser, resendVerificationEmail, refreshUser, logout} = useAuth();
  const t: Translator = useTranslations();
  const a = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();

  const callback = searchParams.get("callbackUrl");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const resend = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");
      await resendVerificationEmail();
      setMessage(t('auth.verifiactionEmailSent'));
      setSeconds(60);
    }
    catch {
      setError(t('auth.unableToSendEmail'));
    }
    finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    try {
      setLoading(true);
      const verified = await refreshUser();


      if (verified && verified.emailVerified) {
        router.replace(callback || "/");
      }
      setError(
        t('auth.yourEmailHasNotBeenVerified')
      );
    }
    finally {
      setLoading(false);
    }
  };

  return <CardWrapper
    headerLabel={t('auth.verifyYourEmail')}
    backButtonLabel={t('auth.signOut')}
    footer={
      <Button variant="link" className="w-full cursor-pointer" onClick={logout}>
        {t('auth.signOut')}
      </Button>
    }
    showSocials={false}
  >
    <div className="space-y-5 w-full flex flex-col items-center justify-center">
      <div className="space-y-2 text-center">

        <MailCheck className="mx-auto h-12 w-12 text-k-primary" />

        <h3 className="font-semibold">
          {t('auth.checkYourInbox')}
        </h3>

        <p className="text-muted-foreground">
          {t('auth.weveSentAVerificationLinkTo')}
        </p>

        <p className="font-medium">

          {currentUser?.email}

        </p>

      </div>

      <div className="flex flex-col gap-2  items-center justify-between">
        {
          message && <FormSuccess message={message} />
        }
        {
          error && <FormError message={error} />
        }
        <Button onClick={verify} size='sm' className='bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer'>
          {loading ?
            <Loader className="animate-spin" />
            :
            t('auth.iveVerifiedMyEmail')
          }
        </Button>

        <Button
          variant="link"
          className='cursor-pointer decoration-k-primary'
          onClick={resend}
          disabled={seconds > 0}
        >
          {seconds > 0 ? a('resendSeconds', {sec: `${seconds}`}) : t('auth.rensendEmail')}
        </Button>
      </div>
    </div>

  </CardWrapper>;
};