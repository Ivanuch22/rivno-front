import React, { useState } from 'react';
import { Container, Box, Typography, Avatar, Grid, TextField, Button, IconButton } from '@mui/material';
import { useAuth } from "@/context/Auth";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import routes from '@/routes';
import { localStorageManager } from "@/services"
import { IUser } from '@/interfaces/user.interfaces';
import uploadFile from '@/services/fileUploadService';
import { toast } from 'react-toastify';

const ProfileSchema = Yup.object().shape({
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



const UserData = ({userObject}:any) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(userObject?.avatar || '');

  const handleFormSubmit = async (userData: IUser) => {

  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

  };

  if (!userObject) {
    return <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Дані користувача відсутні</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, fontFamily: 'inherit' }}>
      <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
        <Avatar
          alt={userObject.full_name}
          src={avatarUrl}
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload">
          <IconButton
            component="span"
            sx={{
              position: 'absolute',
              top: "-20px",
              right: 'calc(50% - 25px)',
              backgroundColor: 'white',
              boxShadow: 3,
              fontFamily: 'inherit'
            }}
          >
            <EditIcon />
          </IconButton>
        </label>
        <Typography variant="h4" sx={{ mt: 2, fontFamily: 'inherit' }}>
          {userObject.full_name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
          {userObject.email}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
          {userObject.is_verified ? 'Підтверджений' : 'Не підтверджений'}
        </Typography>
      </Box>

      <Formik
        initialValues={{
          full_name: userObject.full_name,
          phone: userObject.phone || '',
          country: userObject.country,
          city: userObject.city || '',
          state: userObject.state || '',
          zip_code: userObject.zip_code || '',
          alternate_email: userObject.alternate_email || '',
          alternate_phone: userObject.alternate_phone || '',
          secret_question: userObject.secret_question || '',
          secret_answer: userObject.secret_answer || '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="full_name"
                  as={TextField}
                  label="Повне ім'я"
                  fullWidth
                  error={touched.full_name && !!errors.full_name}
                  helperText={touched.full_name && errors.full_name}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="phone"
                  as={TextField}
                  label="Телефон"
                  fullWidth
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="country"
                  as={TextField}
                  label="Країна"
                  fullWidth
                  error={touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="city"
                  as={TextField}
                  label="Місто"
                  fullWidth
                  error={touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="state"
                  as={TextField}
                  label="Область"
                  fullWidth
                  error={touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="zip_code"
                  as={TextField}
                  label="Поштовий індекс"
                  fullWidth
                  error={touched.zip_code && !!errors.zip_code}
                  helperText={touched.zip_code && errors.zip_code}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="alternate_email"
                  as={TextField}
                  label="Альтернативний email"
                  fullWidth
                  error={touched.alternate_email && !!errors.alternate_email}
                  helperText={touched.alternate_email && errors.alternate_email}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="alternate_phone"
                  as={TextField}
                  label="Альтернативний телефон"
                  fullWidth
                  error={touched.alternate_phone && !!errors.alternate_phone}
                  helperText={touched.alternate_phone && errors.alternate_phone}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="secret_question"
                  as={TextField}
                  label="Секретне питання"
                  fullWidth
                  error={touched.secret_question && !!errors.secret_question}
                  helperText={touched.secret_question && errors.secret_question}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="secret_answer"
                  as={TextField}
                  label="Секретна відповідь"
                  fullWidth
                  error={touched.secret_answer && !!errors.secret_answer}
                  helperText={touched.secret_answer && errors.secret_answer}
                  sx={{ fontFamily: 'inherit' }}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default UserData;
