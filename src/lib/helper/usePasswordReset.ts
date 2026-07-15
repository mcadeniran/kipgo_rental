import { sendPasswordReset } from '@/actions/send-password-reset';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

export const usePasswordReset = () => {
  const t = useTranslations('profile');

  return useMutation({
    mutationFn: sendPasswordReset,

    onSuccess(data) {
      if (data.success) {
        toast.success(t('passwordResetEmailSent'), {
          description: t('checkYourInbox'),
        });
      } else {
        toast.error(data.message);
      }
    },

    onError() {
      toast.error(t('somethingWentWrong'));
    },
  });
};
