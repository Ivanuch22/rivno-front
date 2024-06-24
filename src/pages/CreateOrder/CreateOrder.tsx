import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Stepper, Step, StepLabel, Typography, Container } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import authAPI from "@/http";


import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { localStorageManager } from "@/services";
import routes from "@/routes";
import uploadFile from "@/services/fileUploadService";
import axios from "axios";
import { toast } from "react-toastify";
const validationSchemas = [
  Yup.object().shape({
    firstName: Yup.string().required("Обов'язково"),
    lastName: Yup.string().required("Обов'язково"),
    middleName: Yup.string().required("Обов'язково"),
    phone: Yup.string().required("Обов'язково"),
    email: Yup.string().email("Invalid email").required("Обов'язково"),
    comment: Yup.string().required("Обов'язково"),
    birthDate: Yup.date().required("Обов'язково"),
    age: Yup.number().required("Обов'язково"),
    gender: Yup.string().required("Обов'язково"),
  }),
  Yup.object().shape({
    treatment: Yup.string().required("Обов'язково"),
    treatmentOther: Yup.string().when('treatment', {
      is: 'other',
      then: Yup.string().required("Обов'язково"),
      otherwise: Yup.string(),
    }),
    correction: Yup.string().required("Обов'язково"),
    correctionOther: Yup.string().when('correction', {
      is: 'other',
      then: Yup.string().required("Обов'язково"),
      otherwise: Yup.string(),
    }),
    additionalTools: Yup.string().required("Обов'язково"),
    additionalToolsOther: Yup.string().when('additionalTools', {
      is: 'other',
      then: Yup.string().required("Обов'язково"),
      otherwise: Yup.string(),
    }),
    toothExtraction: Yup.string().required("Обов'язково"),
    toothExtractionOther: Yup.string().when('toothExtraction', {
      is: 'other',
      then: Yup.string().required("Обов'язково"),
      otherwise: Yup.string(),
    }),
    correction2: Yup.string().required("Обов'язково"),
    correction2Other: Yup.string().when('correction2', {
      is: 'other',
      then: Yup.string().required("Обов'язково"),
      otherwise: Yup.string(),
    }),
    gumSmileCorrection: Yup.string().required("Обов'язково"),
    midlineCorrection: Yup.string().required("Обов'язково"),
    separation: Yup.string().required("Обов'язково"),
    complaints: Yup.string().required("Обов'язково"),
    complaintsOther: Yup.string().when('complaints', {
      is: 'other',
      then: Yup.string().required("Обов'язково"),
      otherwise: Yup.string(),
    }),
    orthopedicTreatment: Yup.string().required("Обов'язково"),
    issueCaps: Yup.string().required("Обов'язково"),
    comments: Yup.string(),
  }),
  Yup.object().shape({
    photo1: Yup.mixed().required("Обов'язково"),
    photo2: Yup.mixed().required("Обов'язково"),
    photo3: Yup.mixed().required("Обов'язково"),
    photo4: Yup.mixed().required("Обов'язково"),
    photo5: Yup.mixed().required("Обов'язково"),
    photo6: Yup.mixed().required("Обов'язково"),
  }),
  Yup.object().shape({
    xray: Yup.mixed().required("Обов'язково"),
    ctScan: Yup.mixed().required("Обов'язково"),
    ctLink: Yup.string().required("Обов'язково"),
    comments: Yup.string(),
  }),
  Yup.object().shape({
    scan1: Yup.mixed().required("Обов'язково"),
    scan2: Yup.mixed().required("Обов'язково"),
    comments: Yup.string(),
  }),
];

const stepsName = ["Дані про пацієнта", "План лікування", "Фото", "Рентгенограма + КТ", "Скани/Відбитки"];

const initialValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
  email: "",
  comment: "",
  birthDate: "",
  age: "",
  gender: "",
  treatment: "",
  treatmentOther: "",
  correction: "",
  correctionOther: "",
  additionalTools: "",
  additionalToolsOther: "",
  toothExtraction: "",
  toothExtractionOther: "",
  correction2: "",
  correction2Other: "",
  gumSmileCorrection: "",
  midlineCorrection: "",
  separation: "",
  complaints: "",
  complaintsOther: "",
  orthopedicTreatment: "",
  issueCaps: "",
  comments: "",
  photo1: null,
  photo2: null,
  photo3: null,
  photo4: null,
  photo5: null,
  photo6: null,
  xray: null,
  ctScan: null,
  ctLink: "",
  scan1: null,
  scan2: null,
};

const CreateOrder = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [savedValues, setSavedValues] = useState(localStorageManager.getItem("orderForm") || initialValues);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (values: any) => {
    console.log(values,"sdfs")
    try {
      const response = await authAPI.post(routes.createOrder, {order:values});
      if(response.status===200){
        toast.success("Замовлення успішно створене")
      }
      // Clear local storage and reset form
      // localStorageManager.removeItem("orderForm");
      setActiveStep(0);
      navigate("/");
    } catch (error) {
      console.error("Failed to submit order:", error);
      toast.error("Щось тут не так")

    }
  };
  const handleFileUpload = async (setFieldValue: any, fieldName: any, file: any) => {
    try {
      const uploadedFile = await uploadFile(file);
      const getFormFromLocalStorage: any = localStorageManager.getItem("orderForm");

      const updatedForm = {
        ...getFormFromLocalStorage,
        [fieldName]: uploadedFile.avatarUrl
      };

      localStorageManager.setItem("orderForm", updatedForm);
      setFieldValue(fieldName, uploadedFile.avatarUrl);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  useEffect(() => {
    const savedData = localStorageManager.getItem("orderForm");
    if (savedData) {
      setSavedValues(savedData);
    }
  }, []);
  useEffect(() => {
    console.log(savedValues)
  }, [savedValues]);


  const steps = [
    <Step1 key="step1" />,
    <Step2 key="step2" />,
    <Step3 key="step3" handleFileUpload={handleFileUpload} />,
    <Step4 key="step4" handleFileUpload={handleFileUpload} />,
    <Step5 key="step5" handleFileUpload={handleFileUpload} />,
  ];

  return (
    <Container maxWidth="md">
      <Stepper activeStep={activeStep} sx={{ marginBottom: "20px" }}>
        {stepsName.map((label, index) => (
          <Step key={index}>
            <StepLabel
              style={{ cursor: "pointer" }} onClick={() => setActiveStep(index)}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik

        initialValues={savedValues}
        validationSchema={validationSchemas[activeStep]}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm(initialValues);
        }
        }

      >
        {({ values, isValid, isSubmitting, submitForm }) => {
          useEffect(() => {
            localStorageManager.setItem("orderForm", values);
            setSavedValues(values);
            
          }, [values]);

          return <Form
            style={{ overflowY: "scroll", height: "70vh", display: "block" }}
          >{steps[activeStep]}</Form>;
        }}

      </Formik>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button
          disabled={activeStep == 0}
          variant="contained"
          onClick={handleBack}
          sx={{
            backgroundColor: "#657be5",
            "&:hover": {
              backgroundColor: "#657be25",
            },
            padding: "10px 20px",
          }}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          onClick={()=>{
            if(activeStep !== 4){
              handleNext()
            }else{
              handleSubmit(savedValues)
            }
          }   }
          sx={{
            backgroundColor: "#657be5",
            "&:hover": {
              backgroundColor: "#657be5",
            },
            padding: "10px 20px",
          }}
        >
          {activeStep === 4 ? "Надіслати" : "Вперед"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateOrder;
