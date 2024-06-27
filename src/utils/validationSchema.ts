import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
  full_name: Yup.string().required("Обов'язково"),
  phone: Yup.string(),
  country: Yup.string().required("Обов'язково"),
  city: Yup.string(),
  state: Yup.string(),
  zip_code: Yup.string(),
  alternate_email: Yup.string().email("Недійсний email"),
  alternate_phone: Yup.string(),
  secret_question: Yup.string(),
  secret_answer: Yup.string(),
});
