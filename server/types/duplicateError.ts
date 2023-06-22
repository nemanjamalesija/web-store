export type duplicateErrorDB = Error & {
  keyValue: {
    name?: string;
    email?: string;
  };
};
