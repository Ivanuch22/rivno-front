import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { TextField, Grid, Typography, Box, IconButton, Avatar, CircularProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import xrayDefaultImage from "./defaulImages/OPTG.png";
import ctScanDefaultImage from "./defaulImages/TRG.png";
import { Link } from "react-router-dom";

const defaultImages = {
  xray: xrayDefaultImage,
  ctScan: ctScanDefaultImage,
};

const photoNames = [
  "OПТГ",
  "ТРГ"
];

const Step4 = ({ readOnly = false, handleFileUpload }: any) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [images, setImages] = useState({
    xray: values.xray?.Location || defaultImages.xray,
    ctScan: values.ctScan?.Location || defaultImages.ctScan,
  });
  const [uploadStatus, setUploadStatus] = useState({
    xray: { uploading: false, success: false },
    ctScan: { uploading: false, success: false },
  });

  const handleImageChange = (e: any, name: string) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => ({
          ...prev,
          [name]: reader.result as string,
        }));
        setFieldValue(name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (name: string) => {
    setImages((prev) => ({
      ...prev,
      [name]: defaultImages[name as keyof typeof defaultImages],
    }));
    setFieldValue(name, null);
    setUploadStatus((prev) => ({
      ...prev,
      [name]: { uploading: false, success: false },
    }));
  };

  const handleFileChange = async (event: any, fieldName: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setUploadStatus((prev) => ({
        ...prev,
        [fieldName]: { uploading: true, success: false },
      }));

      try {
        await handleFileUpload(setFieldValue, fieldName, file);
        setUploadStatus((prev) => ({
          ...prev,
          [fieldName]: { uploading: false, success: true },
        }));
        toast.success("Файл успішно завантажений");
      } catch (error) {
        setUploadStatus((prev) => ({
          ...prev,
          [fieldName]: { uploading: false, success: false },
        }));
        toast.error("Помилка завантаження файлу");
      }
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
          Ренгенограма + КТ
        </Typography>

        <Grid container spacing={2}>
          {["xray", "ctScan"].map((name, index) => (
            <Grid item xs={12} sm={4} key={name}>
              <label htmlFor={`file-input-${name}`} style={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid red",
                    borderRadius: "10px",
                    padding: "16px",
                    textAlign: "center",
                    minHeight: "100%",
                  }}
                >
                  {readOnly ? (
                    <Link target="_blank" rel="noopener noreferrer" to={images[name as keyof typeof defaultImages]}>
                      <Avatar
                        src={images[name as keyof typeof defaultImages]}
                        alt={name}
                        variant="rounded"
                        sx={{ width: "100%", aspectRatio: "1/1.2", height: "85%", marginBottom: 2 }}
                      />
                    </Link>
                  ) : (
                    <Avatar
                      src={images[name as keyof typeof defaultImages]}
                      alt={name}
                      variant="rounded"
                      sx={{ width: "100%", aspectRatio: "1/1.2", height: "85%", marginBottom: 2 }}
                    />
                  )}
                  {!readOnly && (
                    <IconButton
                      onClick={() => handleImageRemove(name)}
                      sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "white" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {uploadStatus[name].uploading ? (
                    <CircularProgress sx={{ position: "absolute", bottom: 8, right: 8 }} />
                  ) : uploadStatus[name].success ? (
                    <CheckCircleIcon sx={{ position: "absolute", bottom: 8, right: 8, color: "green" }} />
                  ) : null}
                  <Typography variant="body2">{photoNames[index]}</Typography>
                </Box>
                <input
                  type="file"
                  disabled={readOnly}
                  style={{ display: "none" }}
                  id={`file-input-${name}`}
                  onChange={(e) => {
                    handleFileChange(e, name);
                    handleImageChange(e, name);
                  }}
                />
              </label>
              <ErrorMessage name={name}>
                {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
              </ErrorMessage>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Field
              inputProps={{
                readOnly: readOnly,
              }}
              name="ctLink"
              as={TextField}
              label="Силка на КТ"
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
            <ErrorMessage name="ctLink">
              {(msg) => <Typography sx={{ color: "red" }}>{msg}</Typography>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
            <Field
              inputProps={{
                readOnly: readOnly,
              }}
              name="comments"
              as={TextField}
              label="Коментар"
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

export default Step4;
