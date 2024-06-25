import React, { useState } from 'react';
import routes from '@/routes/index';
import authAPI from "@/http";
import { saveAs } from 'file-saver';
import { Button, CircularProgress } from '@mui/material';
import JSZip from 'jszip';
import { toast } from 'react-toastify';

const DownloadButton = ({ fileKeys }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await authAPI.post(`${routes.baseURL}${routes.downloadOrderFile}`, { fileKeys });
      const { urls } = response.data;

      const zip = new JSZip();

      const fetchPromises = urls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split('?')[0].split('/').pop(); // Extract file name from URL
        zip.file(fileName || `file_${index + 1}`, blob);
      });

      await Promise.all(fetchPromises);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'files.zip');

    } catch (error) {
      toast.error("Помилка при завантаженні файлів")
      console.error('Error downloading files:', error);
    } finally {
      toast.success("Файли успішно завантажені")
      setIsLoading(false);

    }
  };

  return (
    <Button onClick={handleDownload} disabled={isLoading}>
      <Button onClick={handleDownload} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Скачати файли'}
      </Button>
    </Button>
  );
};

export default DownloadButton;
