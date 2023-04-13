const dateConvertor = (date: Date) => {
  // const newDate = new Date(date);
  // return newDate
  //   .toLocaleDateString("en-GB", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   })
  //   .replace(/\//g, ".");
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;
  return formattedDate;
};

export default dateConvertor;
