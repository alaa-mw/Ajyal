import React from 'react';
import { Button, CircularProgress, Box, Alert } from '@mui/material';
import { Download } from '@mui/icons-material';
import useSendData from '../../../hooks/useSendData';

const ExcelDownloader = () => {
  const { mutate: download, ...mutation } = useSendData("/course/excel/download-excel");
  const { isPending, isError, error } = mutation;
  
  const downloadExcel = () => {
    download({
      course_id: 1,
      classroom_course_id: 1
    }, {
      onSuccess: (response) => {
        try {
          // response instanceof Blob
          const blob = response as unknown as Blob;
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${new Date().getTime()}.xlsx`;
          link.style.display = 'none';
          
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        } catch (err) {
          console.error('خطأ في إنشاء التحميل:', err);
        }
      },
      onError: (error) => {
        console.error('فشل التحميل:', error);
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <Button
        variant="contained"
        onClick={downloadExcel}
        disabled={isPending}
        startIcon={isPending ? <CircularProgress size={16} /> : <Download />}
        sx={{
          minWidth: 180,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          '&:disabled': {
            bgcolor: 'action.disabled',
          }
        }}
      >
        {isPending ? 'جاري التحميل...' : '  تحميل ملف الشعبة Excel'}
      </Button>
      
      {isError && (
        <Alert severity="error" sx={{ width: '100%' }}>
          فشل التحميل: {error?.message || 'خطأ غير معروف'}
        </Alert>
      )}
    </Box>
  );
};

export default ExcelDownloader;