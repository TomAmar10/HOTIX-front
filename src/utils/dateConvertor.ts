const dateConvertor = (date: string) => {
  return date.replace("T", ", ").split(".")[0].slice(0, 17);
};

export default dateConvertor;
