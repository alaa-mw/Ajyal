import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Student } from "../../../interfaces/Student";
import { useState } from "react";
import { getStudentName } from "../../../utils/getStudentName";

interface NoteDialogProps {
  open: boolean;
  student: Student | null;
  onClose: () => void;
}

const NoteDialog = ({ open, student, onClose }: NoteDialogProps) => {
  const [noteText, setNoteText] = useState("");
  // Safely construct the student name

   const handleSaveNote = () => {
    console.log("Note added for", student?.id, ":", noteText);
    onClose();
    setNoteText("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>إضافة ملاحظة للطالب {getStudentName(student)}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="الملاحظة"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={handleSaveNote}>حفظ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
