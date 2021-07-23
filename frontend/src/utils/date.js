export const getDate = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString();
};
