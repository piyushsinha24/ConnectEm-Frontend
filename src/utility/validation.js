import * as yup from 'yup';

export const validate = async ({ schema, formData, setErrors }) => {
  setErrors({});

  let isValid = await schema
    .validate(formData, {
      abortEarly: false,
    })
    .then(() => true)
    .catch((validationErr) => {
      if (Array.isArray(validationErr.inner)) {
        let errors = {};
        validationErr.inner.forEach(({ path, message }) => (errors[path] = message));
        setErrors(errors);
      }
      return false;
    });

  return isValid;
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('This field is required'),
  password: yup
    .string()
    .min(6, 'Password must be atleast 6 characters')
    .required('This field is required'),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('This field is required'),
  password: yup
    .string()
    .min(6, 'Password must be atleast be 6 characters')
    .required('This field is required'),
});

export const eventCreationSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  eventLink: yup.string().required('This field is required'),
});

export const bookingSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('This field is required'),
});
