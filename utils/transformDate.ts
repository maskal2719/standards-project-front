import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (dateString: string | Date) => {
  return format(new Date(dateString), "dd MMMM yyyy", { locale: ru });
};
