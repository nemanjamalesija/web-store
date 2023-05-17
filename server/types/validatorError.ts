export type validatorErrorDB = Error & {
  errors: {
    name: {
      name: string;
      message: string;
      properties: {
        message: string;
        type: string;
        minlength: number;
        path: string;
        value: string;
      };
      kind: string;
      path: string;
      value: string;
    };
  };
};
