// Step2.tsx
import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { TextField, Grid, Typography, Box, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const Step2 = ({readOnly}:any) => {
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
          План лікування
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Лікування:</Typography>
            <RadioGroup   value={values.treatment} onChange={(e) => handleRadioChange("treatment", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="upperJaw" control={<Radio />} label="Верхня щелепа" />
              <FormControlLabel disabled={readOnly} value="lowerJaw" control={<Radio />} label="Нижня щелепа" />
              <FormControlLabel disabled={readOnly} value="bothJaws" control={<Radio />} label="Обидві щелепи" />
              <FormControlLabel disabled={readOnly} value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.treatment === "other" && (
              <Field
                inputProps={{
                  readOnly:readOnly
                }}
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
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Корекція:</Typography>
            <RadioGroup   value={values.correction} onChange={(e) => handleRadioChange("correction", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="frontSection" control={<Radio />} label="Фронтальний відділ 3-3" />
              <FormControlLabel disabled={readOnly} value="frontAndSide" control={<Radio />} label="Фронтальний та боковий 5-5" />
              <FormControlLabel disabled={readOnly} value="wholeJaw" control={<Radio />} label="Вся щелепа" />
              <FormControlLabel disabled={readOnly} value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.correction === "other" && (
              <Field
                inputProps={{
                  readOnly:readOnly
                }}
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
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Використання додаткових інструментів:</Typography>
            <RadioGroup   value={values.additionalTools} onChange={(e) => handleRadioChange("additionalTools", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="removableNonRemovable" control={<Radio />} label="Апарати знімні/незнімні" />
              <FormControlLabel disabled={readOnly} value="miniScrews" control={<Radio />} label="Мінігвинти" />
              <FormControlLabel disabled={readOnly} value="buttons" control={<Radio />} label="Кнопки" />
              <FormControlLabel disabled={readOnly} value="overlays" control={<Radio />} label="Накладки" />
              <FormControlLabel disabled={readOnly} value="splintTherapy" control={<Radio />} label="Сплінт терапія" />
              <FormControlLabel disabled={readOnly} value="caseNeeds" control={<Radio />} label="По потребі кейсу" />
              <FormControlLabel disabled={readOnly} value="noTools" control={<Radio />} label="Без додаткових інструментів" />
              <FormControlLabel disabled={readOnly} value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.additionalTools === "other" && (
              <Field
                inputProps={{
                  readOnly:readOnly
                }}
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
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Видалення зубів:</Typography>
            <RadioGroup   value={values.toothExtraction} onChange={(e) => handleRadioChange("toothExtraction", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="wisdomTeethOnly" control={<Radio />} label="Тільки мудрості" />
              <FormControlLabel disabled={readOnly} value="otherTeeth" control={<Radio />} label="Інших зубів" />
              <FormControlLabel disabled={readOnly} value="noExtraction" control={<Radio />} label="Без видалення" />
              <FormControlLabel disabled={readOnly} value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.toothExtraction === "other" && (
              <Field
                inputProps={{
                  readOnly:readOnly
                }}
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
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Корекція:</Typography>
            <RadioGroup   value={values.correction2} onChange={(e) => handleRadioChange("correction2", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="crowding" control={<Radio />} label="Скупченості" />
              <FormControlLabel disabled={readOnly} value="class21" control={<Radio />} label="Класу 2,1" />
              <FormControlLabel disabled={readOnly} value="class22" control={<Radio />} label="Класу 2,2" />
              <FormControlLabel disabled={readOnly} value="class3" control={<Radio />} label="Класу 3" />
              <FormControlLabel disabled={readOnly} value="jawNarrowing" control={<Radio />} label="Звуження щелеп" />
              <FormControlLabel disabled={readOnly} value="openBite" control={<Radio />} label="Відкритий прикус" />
              <FormControlLabel disabled={readOnly} value="deepBite" control={<Radio />} label="Глибокий прикус" />
              <FormControlLabel disabled={readOnly} value="crossBite" control={<Radio />} label="Перехресний прикус" />
              <FormControlLabel disabled={readOnly} value="sagittalGap" control={<Radio />} label="Сагітальна щілина" />
              <FormControlLabel disabled={readOnly} value="retainedTeeth" control={<Radio />} label="Ретеновані зуби" />
              <FormControlLabel disabled={readOnly} value="other" control={<Radio />} label="Інше" />
            </RadioGroup>
            {values.correction2 === "other" && (
              <Field
                inputProps={{
                  readOnly:readOnly
                }}
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
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Ясенна посмішка:</Typography>
            <RadioGroup   value={values.gumSmileCorrection} onChange={(e) => handleRadioChange("gumSmileCorrection", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="mandatory" control={<Radio />} label="Корегувати обовьязково з застосуванням необхідних інструментів" />
              <FormControlLabel disabled={readOnly} value="aligners" control={<Radio />} label="Корегування елайнерами" />
              <FormControlLabel disabled={readOnly} value="noCorrection" control={<Radio />} label="Не корегувати" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Середня лінія:</Typography>
            <RadioGroup   value={values.midlineCorrection} onChange={(e) => handleRadioChange("midlineCorrection", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="mandatory" control={<Radio />} label="Обовьязково корегувати з застосуванням необхідних інструментів для створення умов" />
              <FormControlLabel disabled={readOnly} value="aligners" control={<Radio />} label="Корегування елайнерами" />
              <FormControlLabel disabled={readOnly} value="noCorrection" control={<Radio />} label="Не корегувати" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Сепарація:</Typography>
            <RadioGroup   value={values.separation} onChange={(e) => handleRadioChange("separation", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="possible" control={<Radio />} label="Можлива" />
              <FormControlLabel disabled={readOnly} value="noSeparation" control={<Radio />} label="Без сепарації" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Скарги:</Typography>
            <RadioGroup   value={values.complaints} onChange={(e) => handleRadioChange("complaints", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="snoring" control={<Radio />} label="Біль у СНЩС" />
              <FormControlLabel disabled={readOnly} value="apnea" control={<Radio />} label="Нічне Апноє" />
              <FormControlLabel disabled={readOnly} value="bruxism" control={<Radio />} label="Бруксизм" />
              <FormControlLabel disabled={readOnly} value="toothWear" control={<Radio />} label="Стертість зубів" />
              <FormControlLabel disabled={readOnly} value="other" control={<Radio />} label="Інше" />
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
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Чи планується ортопедичне лікування після ортодонтії:</Typography>
            <RadioGroup   value={values.orthopedicTreatment} onChange={(e) => handleRadioChange("orthopedicTreatment", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="yes" control={<Radio />} label="Так" />
              <FormControlLabel disabled={readOnly} value="no" control={<Radio />} label="Ні" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Видавати капи:</Typography>
            <RadioGroup   value={values.issueCaps} onChange={(e) => handleRadioChange("issueCaps", e.target.value)}>
              <FormControlLabel disabled={readOnly} value="gradually" control={<Radio />} label="Поступово" />
              <FormControlLabel disabled={readOnly} value="entireCourse" control={<Radio />} label="На весь курс лікування" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Field
              inputProps = {{
                readOnly:readOnly
              }}
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
