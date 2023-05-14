const filterObj = (obj: any, ...allowedFields: string[]) => {
  const newObj: { [key: string]: string } = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export default filterObj;
