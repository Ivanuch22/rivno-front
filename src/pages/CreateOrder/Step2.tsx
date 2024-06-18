// Step2.tsx
import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { TextField, Grid, Typography, Box, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const Step2 = () => {
  const { setFieldValue, values } = useFormikContext<any>();

  const handleRadioChange = (field: string, value: string) => {
    setFieldValue(field, value);
    if (value !== 'other') {
      setFieldValue(`${field}Other`, '');
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto", width: "100%" }}>
      <Box
        sx={{
          padding: "20px 28px",
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
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            margin: "20px auto",
          }}
        >
          План лікування
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Лікування:</Typography>
            <RadioGroup row value={values.treatment} onChange={(e) => handleRadioChange("treatment", e.target.value)}>
              <FormControlLabel value="upperJaw" control={<Radio />} label="Верхня щелепа" />
              <FormControlLabel value="lowerJaw" control={<Radio />} label="Нижня щелепа" />
              <FormControlLabel value="bothJaws" control={<Radio />} label="Обидві щелепи" />
              <FormControlLabel value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.treatment === "other" && (
              <Field
                name="treatmentOther"
                as={TextField}
                label="Інше"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "#495057",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#657be5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#657be5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#657be5",
                    },
                  },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Корекція:</Typography>
            <RadioGroup row value={values.correction} onChange={(e) => handleRadioChange("correction", e.target.value)}>
              <FormControlLabel value="frontSection" control={<Radio />} label="Фронтальний відділ 3-3" />
              <FormControlLabel value="frontAndSide" control={<Radio />} label="Фронтальний та боковий 5-5" />
              <FormControlLabel value="wholeJaw" control={<Radio />} label="Вся щелепа" />
              <FormControlLabel value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.correction === "other" && (
              <Field
                name="correctionOther"
                as={TextField}
                label="Інше"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "#495057",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#657be5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#657be5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#657be5",
                    },
                  },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Використання додаткових інструментів:</Typography>
            <RadioGroup row value={values.additionalTools} onChange={(e) => handleRadioChange("additionalTools", e.target.value)}>
              <FormControlLabel value="removableNonRemovable" control={<Radio />} label="Апарати знімні/незнімні" />
              <FormControlLabel value="miniScrews" control={<Radio />} label="Мінігвинти" />
              <FormControlLabel value="buttons" control={<Radio />} label="Кнопки" />
              <FormControlLabel value="overlays" control={<Radio />} label="Накладки" />
              <FormControlLabel value="splintTherapy" control={<Radio />} label="Сплінт терапія" />
              <FormControlLabel value="caseNeeds" control={<Radio />} label="По потребі кейсу" />
              <FormControlLabel value="noTools" control={<Radio />} label="Без додаткових інструментів" />
              <FormControlLabel value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.additionalTools === "other" && (
              <Field
                name="additionalToolsOther"
                as={TextField}
                label="Інше"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "#495057",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#657be5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#657be5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#657be5",
                    },
                  },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Видалення зубів:</Typography>
            <RadioGroup row value={values.toothExtraction} onChange={(e) => handleRadioChange("toothExtraction", e.target.value)}>
              <FormControlLabel value="wisdomTeethOnly" control={<Radio />} label="Тільки мудрості" />
              <FormControlLabel value="otherTeeth" control={<Radio />} label="Інших зубів" />
              <FormControlLabel value="noExtraction" control={<Radio />} label="Без видалення" />
              <FormControlLabel value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.toothExtraction === "other" && (
              <Field
                name="toothExtractionOther"
                as={TextField}
                label="Інше"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "#495057",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#657be5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#657be5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#657be5",
                    },
                  },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Корекція:</Typography>
            <RadioGroup row value={values.correction2} onChange={(e) => handleRadioChange("correction2", e.target.value)}>
              <FormControlLabel value="crowding" control={<Radio />} label="Скупченості" />
              <FormControlLabel value="class21" control={<Radio />} label="Класу 2,1" />
              <FormControlLabel value="class22" control={<Radio />} label="Класу 2,2" />
              <FormControlLabel value="class3" control={<Radio />} label="Класу 3" />
              <FormControlLabel value="jawNarrowing" control={<Radio />} label="Звуження щелеп" />
              <FormControlLabel value="openBite" control={<Radio />} label="Відкритий прикус" />
              <FormControlLabel value="deepBite" control={<Radio />} label="Глибокий прикус" />
              <FormControlLabel value="crossBite" control={<Radio />} label="Перехресний прикус" />
              <FormControlLabel value="sagittalGap" control={<Radio />} label="Сагітальна щілина" />
              <FormControlLabel value="retainedTeeth" control={<Radio />} label="Ретеновані зуби" />
              <FormControlLabel value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.correction2 === "other" && (
              <Field
                name="correction2Other"
                as={TextField}
                label="Інше"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "#495057",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#657be5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#657be5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#657be5",
                    },
                  },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Ясенна посмішка:</Typography>
            <RadioGroup row value={values.gumSmileCorrection} onChange={(e) => handleRadioChange("gumSmileCorrection", e.target.value)}>
              <FormControlLabel value="mandatory" control={<Radio />} label="Корегувати обовьязково з застосуванням необхідних інструментів" />
              <FormControlLabel value="aligners" control={<Radio />} label="Корегування елайнерами" />
              <FormControlLabel value="noCorrection" control={<Radio />} label="Не корегувати" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Середня лінія:</Typography>
            <RadioGroup row value={values.midlineCorrection} onChange={(e) => handleRadioChange("midlineCorrection", e.target.value)}>
              <FormControlLabel value="mandatory" control={<Radio />} label="Обовьязково корегувати з застосуванням необхідних інструментів для створення умов" />
              <FormControlLabel value="aligners" control={<Radio />} label="Корегування елайнерами" />
              <FormControlLabel value="noCorrection" control={<Radio />} label="Не корегувати" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Сепарація:</Typography>
            <RadioGroup row value={values.separation} onChange={(e) => handleRadioChange("separation", e.target.value)}>
              <FormControlLabel value="possible" control={<Radio />} label="Можлива" />
              <FormControlLabel value="noSeparation" control={<Radio />} label="Без сепарації" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Скарги:</Typography>
            <RadioGroup row value={values.complaints} onChange={(e) => handleRadioChange("complaints", e.target.value)}>
              <FormControlLabel value="snoring" control={<Radio />} label="Біль у СНЩС" />
              <FormControlLabel value="apnea" control={<Radio />} label="Нічне Апноє" />
              <FormControlLabel value="bruxism" control={<Radio />} label="Бруксизм" />
              <FormControlLabel value="toothWear" control={<Radio />} label="Стертість зубів" />
              <FormControlLabel value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.complaints === "other" && (
              <Field
                name="complaintsOther"
                as={TextField}
                label="Інше"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "#495057",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#657be5",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#657be5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#657be5",
                    },
                  },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Чи планується ортопедичне лікування після ортодонтії:</Typography>
            <RadioGroup row value={values.orthopedicTreatment} onChange={(e) => handleRadioChange("orthopedicTreatment", e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Так" />
              <FormControlLabel value="no" control={<Radio />} label="Ні" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Видавати капи:</Typography>
            <RadioGroup row value={values.issueCaps} onChange={(e) => handleRadioChange("issueCaps", e.target.value)}>
              <FormControlLabel value="gradually" control={<Radio />} label="Поступово" />
              <FormControlLabel value="entireCourse" control={<Radio />} label="На весь курс лікування" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Field
              name="comments"
              as={TextField}
              label="Коментарі"
              fullWidth
              required
              multiline
              rows={4}
              sx={{
                "& label.Mui-focused": {
                  color: "#495057",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#657be5",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#657be5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#657be5",
                  },
                },
              }}
            />
            <ErrorMessage name="comments">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
};

export default Step2;
