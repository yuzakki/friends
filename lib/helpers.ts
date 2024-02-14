import { franc } from 'franc';
import { format } from 'date-fns';

export function formattedDate(dateString: Date | undefined | null) {
  if (!dateString) return;

  const dateObject = new Date(dateString);
  if (isNaN(dateObject.getTime())) {
    return 'Invalid date';
  }

  const formattedDate = format(dateObject, 'MMM.dd, yyyy');
  return formattedDate;
}

export function PostFormattedDate(dateString: Date | undefined | null) {
  if (!dateString) return;

  const dateObject = new Date(dateString);
  if (isNaN(dateObject.getTime())) {
    return 'Invalid date';
  }

  const formattedDate = format(dateObject, "MMMM d 'at' h:mm aa");

  return formattedDate;
}

export function detectLanguage(text: string) {
  return franc(text);
}
