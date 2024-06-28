import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { TextField, Grid, Typography, Box, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const Step1 = ({readOnly=false}: any) => {
  const { setFieldValue, values } = useFormikContext<any>();

  const handleDateChange = (date: any) => {
    const birthDate = dayjs(date);
    const today = dayjs();
    const years = today.diff(birthDate, 'year');
    birthDate.add(years, 'year');
    const months = today.diff(birthDate, 'month');
    birthDate.add(months, 'month');
    const days = today.diff(birthDate, 'day');

    let age = '';
    if (years > 0) {
      age = `${years} рок${years > 1 ? 'ів' : ''}`;
    } else if (months > 0) {
      age = `${months} місяц${months > 1 ? 'ів' : 'ь'}`;
    } else if (days > 0) {
      age = `${days} дн${days > 1 ? 'ів' : 'ь'}`;
    }

    setFieldValue("birthDate", birthDate.format("YYYY-MM-DD"));
    setFieldValue("age", age);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", width: "100%" }}>
      <Box
        sx={{
          padding: "20px 10px",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          background: "#FFF",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: "var(--009-efd, #343A40)",
                        fontSize: {
              xs: '22px', // Ширина вікна < 700px
              sm: '36px'  // Ширина вікна ≥ 700px
            },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            margin: "20px auto",
          }}
        >
          Дані про пацієнта
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="firstName"
              as={TextField}
              label="Ім'я"
              fullWidth
              required
              sx={{

                "& label.Mui-focused": {
                  color: "#495057",
                  
                },
                "& .MuiInput-underline:after": {
                  
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",


                  "&:hover fieldset": {
                    borderColor: "#657be5",

                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="firstName">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="lastName"
              as={TextField}
              label="Прізвище"
              fullWidth
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="lastName">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="middleName"
              as={TextField}
              label="По-батькові"
              fullWidth
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                    
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="middleName">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="phone"
              as={TextField}
              label="Телефон"
              fullWidth
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="phone">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="email">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
                
              label="Дата народження"
              value={dayjs(values.birthDate)}
              onChange={(date) => handleDateChange(date)}
            />
            <ErrorMessage name="birthDate">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="age"
              as={TextField}
              label="Вік"
              fullWidth
              required
              disabled
              value={values.age}
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="age">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              inputProps ={{
                readOnly:readOnly
              }}
              name="gender"
              as={TextField}
              label="Стать"
              fullWidth
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {                 borderRadius: "20px",
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="gender">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Step1;
