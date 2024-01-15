const getAgeByDate = (date: string): number => {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();
  const nowDay = nowDate.getDate();
  const inputDate = new Date(date);
  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth();
  const inputDay = inputDate.getDate();
  let age = nowYear - inputYear;
  const month = nowMonth - inputMonth;
  const day = nowDay - inputDay;

  if (month < 0 || (month === 0 && day < 0)) {
    age--;
  }

  return age;
};

export { getAgeByDate };
