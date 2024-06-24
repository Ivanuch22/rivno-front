import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { TextField, Grid, Typography, Box, Button, IconButton, Avatar } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import scan1DefaultImage from "./defaulImages/123.png";
import scan2DefaultImage from "./defaulImages/1234.png";
import { Link } from "react-router-dom";

const defaultImages = {
  scan1: scan1DefaultImage,
  scan2: scan2DefaultImage,
};

const photoNames = [
    "Скан 1",
    "Скан 2"
]

const Step5 = ({readOnly,handleFileUpload}:any) => {
  const { setFieldValue ,values} = useFormikContext<any>();
  const [images, setImages] = useState({
    scan1: values.scan1||defaultImages.scan1,
    scan2: values.scan2||defaultImages.scan2,
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
          Скани/ Отиски
        </Typography>

        <Grid container spacing={2}>
          {["scan1", "scan2"].map((name, index) => (
            <Grid item xs={12} sm={4} key={name}>
              <label htmlFor={`file-input-${name}`}
               style={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    position: 'relative',
                    border: '1px solid red',
                    borderRadius: '10px',
                    padding: '16px',
                    textAlign: 'center',
                    height: 'auto',
                  }}
                >
                  {readOnly ?
                    <Link target="_blank" rel="noopener noreferrer" to={images[name as keyof typeof defaultImages]} >
                      <Avatar
                        src={images[name as keyof typeof defaultImages]}
                        alt={name}
                        variant="rounded"
                        sx={{ width: '100%', height: '85%', marginBottom: 2 }}
                      />
                    </Link> :
                    <Avatar
                      src={images[name as keyof typeof defaultImages]}
                      alt={name}
                      variant="rounded"
                      sx={{ width: '100%', height: '85%', marginBottom: 2 }}
                    />}
                  <IconButton
                    onClick={() => handleImageRemove(name)}
                    sx={{ position: 'absolute', top: 8, left: 8, backgroundColor: 'white' }}
                  >
                  </IconButton>
                  <Typography variant="body2">{photoNames[index]}</Typography>
                </Box>
                <input
                  disabled={readOnly}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id={`file-input-${name}`}
                  onChange={(e) => {
                    handleFileChange(e,name)
                    handleImageChange(e, name)}}
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
                readOnly:readOnly
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

export default Step5;
