import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Box, Typography, Avatar, Grid, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import { useAuth } from "@/context/Auth";
import { Formik, Form, Field } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import routes from '@/routes';
import { localStorageManager } from "@/services"
import { IUser } from '@/interfaces/user.interfaces';
import uploadFile from '@/services/fileUploadService';
import authAPI from '@/http';
import { toast } from 'react-toastify';
import { ProfileSchema } from '@/utils/validationSchema';
import { useQuery } from 'react-query';
import { initialUserValues } from '@/utils/initialValueFormik';
import { useNavigate } from 'react-router-dom';
import style from "./UserProfile.module.css"

const Profile = () => {
  const navigate = useNavigate();
  const getUserData = useCallback(async () => {
    try {
      const res = await authAPI.get(routes.me);
      return res.data;
    } catch (error) {
      return error;
    }
  }, [])

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserData
  });
  const [avatarUrl12, setAvatarUrl] = useState<string>('');
  if (isLoading) return <CircularProgress />;
  const { user: userObject } = data;


  const handleFormSubmit = async (userData: IUser) => {
    if (userData) {
      try {
        const resposnse = await authAPI.put(`${routes.updateProfile}`, userData,)
        if (resposnse.status === 200) {
          localStorageManager.removeUser()
          localStorageManager.setUser(resposnse.data.user)
          toast.success(resposnse.data.message);
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  };



  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Файл для завантаження не вибрано.");
      return;
    }

    setAvatarUrl(URL.createObjectURL(file));

    try {
      const uploadResult = await uploadFile(file);
      if (uploadResult && uploadResult.avatarUrl) {
        const updateResponse = await authAPI.put(`${routes.updateProfile}`, { avatar: uploadResult.avatarUrl.Location });
        if (updateResponse.status === 200) {
          localStorageManager.removeUser();
          localStorageManager.setUser(updateResponse.data.user);
          setAvatarUrl(uploadResult.avatarUrl.Location);
          toast.success("Аватар успішно оновлено.");
          refetch();  // Виклик refetch для оновлення даних користувача
        }
      }
    } catch (error) {
      console.error('Помилка при оновленні аватара:', error);
      toast.error("Не вдалося оновити аватар.");
    }
  };
  if (isError || !userObject) return <Typography variant="h6">Не вдалося завантажити ваші данні</Typography>

  if (!userObject) {
    return <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Дані користувача відсутні</Typography>;
  }
  return (
    <Container className={style.block}>
      <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
        <Avatar
          alt={userObject.full_name}
          src={userObject.avatar ? userObject.avatar : avatarUrl12} // Використовуйте avatarUrl зі стану або прямо з даних користувача
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <input
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
        initialValues={userObject || initialUserValues}
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
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
                  sx={{
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#657be5",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "&:hover fieldset": {
                        borderColor: "#657be5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#657be5",
                      },
                    },
                  }
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                style={{ color: "#fff" }}
                type="submit"
                disabled={!isValid || !dirty}
                sx={{ fontFamily: 'inherit', borderRadius: "20px" }}
              >
                Оновити профіль
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Profile;
