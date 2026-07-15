import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { signOut } from 'firebase/auth';

import { useRouter } from '@/i18n/navigation';
import { deleteAccount } from '@/actions/delete-account';
import { auth } from '@/app/[locale]/firebase/config';
import { useTranslations } from 'next-intl';

export function useDeleteAccount() {
  const router = useRouter();
  const t = useTranslations('profile');

  return useMutation({
    mutationFn: deleteAccount,

    async onSuccess() {
      toast.success(t('accountDeletedSuccessfully'));

      await signOut(auth);

      router.replace('/');
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          toast.error(t('incorrectPassword'));

          break;

        case 'auth/invalid-credential':
          toast.error(t('invalidEmailOrPassword'));

          break;

        case 'auth/requires-recent-login':
          toast.error(t('pleaseSignInAgain'));

          break;

        case 'auth/network-request-failed':
          toast.error(t('checkYourInternet'));

          break;

        default:
          toast.error(t(error.message) ?? t('unableToDeleteAccount'));
      }
    },
  });
}
