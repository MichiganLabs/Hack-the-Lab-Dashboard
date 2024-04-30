export const convertFromISO = (isoDateString: string) => {
  if (!isoDateString) {
    return '';
  }

  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
