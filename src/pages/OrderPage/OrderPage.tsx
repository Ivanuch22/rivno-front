import authAPI from "@/http";
import { Formik, Form } from "formik";
import { Box, Button, Stepper, Step, StepLabel, Typography, Container, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Step1 from "../CreateOrder/Step1";
import Step2 from "../CreateOrder/Step2";
import Step3 from "../CreateOrder/Step3";
import Step4 from "../CreateOrder/Step4";
import Step5 from "../CreateOrder/Step5";
import routes from "@/routes";
import UserData from "../CreateOrder/UserData";

import DownloadButton from "@/components/DownloadButton";


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
    user: null,
};

const OrderPage = () => {
    const params = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [savedValues, setSavedValues] = useState(initialValues);
    const [savedValueKeys, setSavedValueKeys] = useState([])
    const navigate = useNavigate();

    const fieldsToConvert = [
        'photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6',
        'xray', 'ctScan', 'scan1', 'scan2'
    ];

    const getOrder = async () => {
        const response = await authAPI.get(`/orders/${params.orderId}`);
        return response.data;
    };

    const { isPending, error, data }: any = useQuery({ queryKey: [`orders${params.orderId}`], queryFn: getOrder });

    useEffect(() => {
        if (data?.order) {
            let newObj = { ...data.order }
            const newFilterdObj: any = [];

            fieldsToConvert.forEach(field => {
                if (newObj[field] && typeof newObj[field] === 'string') {
                    newObj[field] = JSON.parse(newObj[field]);
                    newFilterdObj.push(newObj[field].Key)
                }
            });
            setSavedValueKeys(newFilterdObj.filter(element=>element))
            setSavedValues(newObj);
        }
    }, [data]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async (values: any) => {
        navigate(routes.index)
    };

    const steps = [
        <Step1 key="step1" readOnly={true} />,
        <Step2 key="step2" readOnly={true} />,
        <Step3 key="step3" readOnly={true} />,
        <Step4 key="step4" readOnly={true} />,
        <Step5 key="step5" readOnly={true} />,
        savedValues.user ? <UserData key="step5" userObject={savedValues.user} readOnly={true} /> : null,
    ];
    const stepsName = savedValues.user ? ["Дані про пацієнта", "План лікування", "Фото", "Рентгенограма + КТ", "Скани/Відбитки", "Данні про лікаря"] : ["Дані про пацієнта", "План лікування", "Фото", "Рентгенограма + КТ", "Скани/Відбитки"];

    if (isPending) return <CircularProgress />;

    if (error) return 'An error has occurred: ' + error.message;

    const fileKeys = [savedValues.photo1, savedValues.photo2, savedValues.photo3, savedValues.photo4, savedValues.photo5]; // Assuming 'photo1' is the file key

    return (
        <Container >
      <Stepper activeStep={activeStep} sx={{display:{
         xs: 'none', // Ширина вікна < 700px
         sm: 'flex'
      },  marginBottom: "20px", }}>
                {stepsName.map((label, index) => (
                    <Step key={index}>
                        <StepLabel
                            style={{ cursor: "pointer" }} onClick={() => setActiveStep(index)}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Formik
                enableReinitialize
                initialValues={savedValues}
                validationSchema={validationSchemas[activeStep]}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                    actions.setSubmitting(false);
                }}
            >
                {({ values }) => {
                    useEffect(() => {
                        console.log(values, "values");
                    }, [values]);
                    return (
                        <Form style={{ overflowY: "scroll", height: "70vh", display: "block" }}>
                            {steps[activeStep]}
                        </Form>
                    );
                }}
            </Formik>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px",maxWidth: "100%" }}>
                <Button
                    disabled={activeStep === 0}
                    variant="contained"
                    onClick={handleBack}
                    sx={{
                        backgroundColor: "#657be5",
                        "&:hover": {
                            backgroundColor: "#657be25",
                        },
                        padding: "7px 20px",
                    }}
                >
                    Назад
                </Button>
                <DownloadButton fileKeys={savedValueKeys} />
                <Button
                    variant="contained"
                    onClick={() => {
                        if (savedValues.user) {
                            if (activeStep !== 5) {
                                handleNext();
                            } else {
                                handleSubmit(savedValues);
                            }
                        } else {
                            if (activeStep !== 4) {
                                handleNext();
                            } else {
                                handleSubmit(savedValues);
                            }
                        }

                    }}
                    sx={{
                        backgroundColor: "#657be5",
                        "&:hover": {
                            backgroundColor: "#657be5",
                        },
                        padding: "10px 20px",
                    }}
                >
                    {savedValues.user ? activeStep === 5 ? "Закрити" : "Вперед" : activeStep === 4 ? "Закрити" : "Вперед"}
                </Button>
            </Box>
        </Container>
    );
};

export default OrderPage;
