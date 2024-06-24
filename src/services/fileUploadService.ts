// services/fileUploadService.js
import axios from 'axios';
import routes from '@/routes';
import { localStorageManager } from './LocalStorage';

import authAPI from '@/http';
const uploadFile = async (file:any) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await authAPI.post(routes.uploadFile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('File uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default uploadFile;
