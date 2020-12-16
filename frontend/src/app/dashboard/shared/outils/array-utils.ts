export const filterNumber = (value): boolean => {
  return isNaN(Number(value)) === true;
};

export const toArray = (data: any): any[] => {
  return Object.keys(data).filter(filterNumber).map(key => ({ value: data[key], label: key }));
};
