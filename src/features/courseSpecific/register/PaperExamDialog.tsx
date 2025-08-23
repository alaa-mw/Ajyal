import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  IconButton,
} from '@mui/material';
import { CloudUpload, Save, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface PaperDialogProps {
  open: boolean;
  onClose: () => void;
}

const PaperExamDialog = ({
  open,
  onClose,
}: PaperDialogProps) => {
  const [formData, setFormData] = useState({
    curriculum_id: '',
    title: '',
    description: '',
    exam_date: '',
    max_degree: '',
    file: null
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // const handleOpen = () => {
  //   setOpen(true);
  //   // Reset form when opening
  //   setFormData({
  //     curriculum_id: '',
  //     title: '',
  //     description: '',
  //     exam_date: '',
  //     max_degree: '',
  //     file: null
  //   });
  //   setError('');
  //   setSuccess('');
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

      const submitData = new FormData();
      submitData.append('curriculum_id', formData.curriculum_id);
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('exam_date', formData.exam_date);
      submitData.append('max_degree', formData.max_degree);
      
      if (formData.file) {
        submitData.append('file', formData.file);
      }

      // Replace with your actual API call
      const response = await fetch('/course/store-paperExam', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Add your auth token
        },
        body: submitData
      });

      if (!response.ok) {
        throw new Error('فشل في إرسال البيانات');
      }

      const result = await response.json();
      setSuccess('تم حفظ الامتحان بنجاح!');
      console.log('Success:', result);
      
      // Reset form
      setFormData({
        curriculum_id: '',
        title: '',
        description: '',
        exam_date: '',
        max_degree: '',
        file: null
      });
    
  };

  return (
    <>
      {/* Dialog component */}
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white'
        }}>
          <Typography variant="h5" component="span">
            رفع علامة امتحان ورقي
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'white',
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1,p:2 }}>
            <FormControl fullWidth>
              <InputLabel id="curriculum-label">المادة الدراسية</InputLabel>
              <Select
                labelId="curriculum-label"
                name="curriculum_id"
                value={formData.curriculum_id}
                onChange={handleInputChange}
                label="المادة الدراسية"
                required
              >
                <MenuItem value="1">الرياضيات</MenuItem>
                <MenuItem value="2">العلوم</MenuItem>
                <MenuItem value="3">اللغة العربية</MenuItem>
                <MenuItem value="4">اللغة الإنجليزية</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="title"
              label="عنوان الامتحان"
              value={formData.title}
              onChange={handleInputChange}
              required
              fullWidth
            />

            <TextField
              name="description"
              label="وصف الامتحان"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              fullWidth
            />

            <TextField
              name="exam_date"
              label="تاريخ الامتحان"
              type="date"
              value={formData.exam_date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />

            <TextField
              name="max_degree"
              label="الدرجة الكاملة"
              type="number"
              value={formData.max_degree}
              onChange={handleInputChange}
              inputProps={{ min: 0 }}
              required
              fullWidth
            />

            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ py: 1.5 }}
            >
              رفع ملف الامتحان
              <VisuallyHiddenInput 
                type="file" 
                onChange={handleFileChange}
                accept=".xlsx,.xls,.pdf"
                required
              />
            </Button>
            
            {formData.file && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                الملف المحدد: {formData.file.name}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={onClose} 
            disabled={loading}
            sx={{ color: 'text.secondary' }}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            sx={{ px: 3 }}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaperExamDialog;