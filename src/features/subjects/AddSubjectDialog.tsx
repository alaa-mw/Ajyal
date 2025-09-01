import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import useSendData from "../../hooks/useSendData";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface Props {
  open: boolean;
  onClose: () => void;
  className: string;
}

const AddSubjectDialog = ({ open, onClose, className }: Props) => {
  const initialState = {
    name: "",
    description: "",
    subjects_type: className,
    topics: [] as string[],
  };
  console.log("cls", className);
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialState);
  const [currentTopic, setCurrentTopic] = useState("");

  const { mutate: addSubject } = useSendData("/subjects/create");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTopic = () => {
    const trimmedTopic = currentTopic.trim();
    if (trimmedTopic && !formData.topics.includes(trimmedTopic)) {
      setFormData((prev) => ({
        ...prev,
        topics: [...prev.topics, trimmedTopic],
      }));
      setCurrentTopic(""); // Clear the input field
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic !== topicToRemove),
    }));
  };

  const handleSubmit = () => {
    addSubject(formData, {
      onSuccess: (response) => {
        showSnackbar(response.message, "success");
        onClose();
      },
      onError: (error) => showSnackbar(error.message, "error"),
    });
  };

  // Clear state when dialog closes
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setFormData(initialState);
  }, [open]); // fix to clear state
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>إضافة مادة جديدة</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            name="name" // Add name attribute for the generic handler
            label="اسم المادة"
            variant="outlined"
            fullWidth
            required
            value={formData.name} // Bind to formData
            onChange={handleChange}
          />
          <TextField
            name="description" // Add name attribute
            label="وصف المادة"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={formData.description} // Bind to formData
            onChange={handleChange}
          />
          <Box>
            <Typography gutterBottom variant="subtitle2" color="text.secondary">
              المواضيع (Topics)
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                label="أضف موضوع"
                variant="outlined"
                size="small"
                fullWidth
                value={currentTopic}
                onChange={(e) => setCurrentTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
              />
              <Button variant="outlined" onClick={handleAddTopic}>
                إضافة
              </Button>
            </Stack>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
              sx={{ mt: 2, minHeight: "40px" }}
            >
              {formData.topics.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  onDelete={() => handleRemoveTopic(topic)}
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: "16px 24px" }}>
        <Button onClick={onClose} color="inherit">
          إلغاء
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {"حفظ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubjectDialog;
