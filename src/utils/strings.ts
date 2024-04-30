export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const camelCaseToTitleCase = (camelCase: string) => {
  const words = camelCase.replace(/([A-Z])/g, ' $1');
  if (!words) return '';
  return capitalizeFirstLetter(words);
};
