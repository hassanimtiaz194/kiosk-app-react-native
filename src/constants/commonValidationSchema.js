import * as Yup from 'yup';

export const emailRequiredError = 'Email is required';
export const emailPatternError = 'Invalid email format';

export const phoneNumberRequiredError = 'Phone number is required';
export const phoneNumberValidError = 'Phone number is not valid';

export const emailSchema = Yup.string().required(emailRequiredError).email(emailPatternError);

export const phoneNumberSchema = Yup.string()
    .length(11, phoneNumberValidError)
    .required(phoneNumberRequiredError);