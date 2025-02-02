import { Icon } from '@/shared/ui/button';

export const getAriaLabel = (iconVariant: Icon): string => {
  const labels: Record<Icon, string> = {
    delete: 'Удалить',
    edit: 'Редактировать',
    done: 'Готово',
    cancel: 'Отмена',
  };
  return labels[iconVariant];
};
