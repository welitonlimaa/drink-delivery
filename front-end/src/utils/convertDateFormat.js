function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const yearDigits = -2;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(yearDigits);

  return `${day}/${month}/${year}`;
}
export default convertDateFormat;
