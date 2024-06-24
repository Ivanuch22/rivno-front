import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { TextField, Grid, Typography, Box, Button, IconButton, Avatar } from "@mui/material";
import photo1 from "./defaulImages/1.png";
import photo2 from "./defaulImages/2.png";
import photo3 from "./defaulImages/3.png";
import photo4 from "./defaulImages/4.png";
import photo5 from "./defaulImages/5.png";
import photo6 from "./defaulImages/6.png";
import { localStorageManager } from "@/services";
import { Link } from "react-router-dom";

const defaultImages = {
  photo1: photo1,
  photo2: photo2,
  photo3: photo3,
  photo4: photo4,
  photo5: photo5,
  photo6: photo6,
};

const photoNames = [
  "1. анфас з посмішкою",
  "2. оклюзійний вигляд верхнього зубного ряду",
  "3. оклюзійний вигляд нижнього зубного ряду",
  "4. Латеральний вид праворуч",
  "5. Фронтальный вид",
  "6. Латеральний вид зліва"
];

const Step3 = ({ readOnly=false, handleFileUpload }: any) => {
  const { setFieldValue, values } = useFormikContext<any>();

  const [photos, setPhotos] = useState({
    photo1: values.photo1 || defaultImages.photo1,
    photo2: values.photo2 || defaultImages.photo2,
    photo3: values.photo3 || defaultImages.photo3,
    photo4: values.photo4 || defaultImages.photo4,
    photo5: values.photo5 || defaultImages.photo5,
    photo6: values.photo6 || defaultImages.photo6,
  });

  useEffect(() => {
    setPhotos((prev) => ({
      ...prev,
      photo1: values.photo1 || defaultImages.photo1,
      photo2: values.photo2 || defaultImages.photo2,
      photo3: values.photo3 || defaultImages.photo3,
      photo4: values.photo4 || defaultImages.photo4,
      photo5: values.photo5 || defaultImages.photo5,
      photo6: values.photo6 || defaultImages.photo6,
    }));
  }, [values]);

  const handlePhotoChange = (e: any, name: string) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => ({
          ...prev,
          [name]: reader.result as string,
        }));
        setFieldValue(name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event: any, fieldName: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      handleFileUpload(setFieldValue, fieldName, file);
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
          Фото
        </Typography>

        <Grid container spacing={2}>
          {Object.keys(defaultImages).map((photoName, index) => (
            <Grid item xs={12} sm={6} md={4} key={photoName} minHeight={300}>
              <label htmlFor={`file-input-${photoName}`}>
                <Box
                  style={{ cursor: "pointer" }}
                  sx={{
                    height: "100%",
                    position: 'relative',
                    border: '1px solid red',
                    borderRadius: '10px',
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  {readOnly ?
                    <Link target="_blank" rel="noopener noreferrer" to={photos[photoName as keyof typeof defaultImages]} >
                      <Avatar
                        src={photos[photoName as keyof typeof defaultImages]}
                        alt={photoName}
                        variant="rounded"
                        sx={{ width: '100%', height: '85%', marginBottom: 2 }}
                      />
                    </Link> :
                    <Avatar
                      src={photos[photoName as keyof typeof defaultImages]}
                      alt={photoName}
                      variant="rounded"
                      sx={{ width: '100%', height: '85%', marginBottom: 2 }}
                    />}

                  <Typography variant="body2">{photoNames[index]}</Typography>
                </Box>

                <input
                  disabled={readOnly}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id={`file-input-${photoName}`}
                  onChange={(e) => {
                    handleFileChange(e, photoName);
                    handlePhotoChange(e, photoName);
                  }}
                />
              </label>
              <ErrorMessage name={photoName}>
                {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
              </ErrorMessage>
            </Grid>
          ))}
        </Grid>

      </Box>
    </Box>
  );
};

export default Step3;