// @ts-nocheck
import React from 'react';
import { useMutation } from 'react-query';
import { Button, CircularProgress } from '@mui/material';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import routes from '@/routes/index';
import authAPI from "@/http";

const DownloadButton = ({ fileKeys }: {fileKeys:string[]}) => {
  const {mutate: downloadFiles, isLoading}= useMutation(
    async ()=>{
      const response = await authAPI.post(routes.downloadOrderFile, {fileKeys});
      return response.data.urls;
    },
    {
      onSuccess: async (urls:string[])=>{
        try{
          const zip = new JSZip();
          const fetchPromises = urls.map(async (url:string,index:number)=>{
            const response = await fetch(url);
            const blob = await response.blob();
            const fileName = url.split("?")[0].split("/").pop();
            zip.file(fileName || `file_${index+1}`, blob)
          })

          await Promise.all(fetchPromises);

          const zipBlob = await zip.generateAsync({type:"blob"})
          saveAs(zipBlob,"file.zip")
          toast.success("Файли успішно завантажені")
        }catch (error){
          toast.error("Помилка при створенні zip архіву")
        }
      },
      onError: (error)=>{
        toast.error("Помилка при завантаженні zip архіву")
      }
    }
  )


  return (
      <Button onClick={()=>downloadFiles()} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Скачати файли'}
      </Button>
  );
};

export default DownloadButton;
