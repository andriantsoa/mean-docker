const filterNumber = (value): boolean => {
  return isNaN(Number(value)) === true;
};

const toArray = (data: any, filterNumber: any): any[] => {
  return Object.keys(data).filter(filterNumber).map(key => ({ value: data[key], label: key }));
};
