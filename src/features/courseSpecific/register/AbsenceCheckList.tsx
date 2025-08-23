/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Paper,
  Avatar,
  ListItemAvatar,
  Chip,
  Drawer,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  Close,
  Checklist,
} from "@mui/icons-material";
import { getStudentName } from "../../../utils/getStudentName";
import { CourseRegistrationsStudent } from "../../../interfaces/Course";

interface AbsenceCheckListProps {
  students: CourseRegistrationsStudent[];
  open: boolean;
  onClose: () => void;
  onSave?: (absentStudents: string[]) => void;
}

const AbsenceCheckList: React.FC<AbsenceCheckListProps> = ({
  students = [],
  open,
  onClose,
  onSave,
}) => {
  const [absencesList, setAbsencesList] = useState<string[]>([]);

  const handleAbsenceChange = (registrationId: string, isPresent: boolean) => {
    setAbsencesList((prev) =>
      isPresent
        ? prev.filter((id) => id !== registrationId)
        : [...prev, registrationId]
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(absencesList);
    }
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          height: "80vh",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          px: 2,
          pt: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          zIndex: 1,
          pt: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          قائمة التفقد اليومي
          <Chip
            label={`${absencesList.length} غياب`}
            size="small"
            color="error"
            sx={{ margin: 1 }}
          />
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List dense>
          {students.map((registration) => (
            <ListItem
              key={registration.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  icon={<RadioButtonUnchecked color="disabled" />}
                  checkedIcon={<CheckCircle color="primary" />}
                  checked={!absencesList.includes(registration.id)}
                  onChange={(e) =>
                    handleAbsenceChange(registration.id, e.target.checked)
                  }
                />
              }
              sx={{
                borderBottom: "1px solid #eee",
                "&:last-child": {
                  borderBottom: "none",
                },
                bgcolor: absencesList.includes(registration.id)
                  ? "action.hover"
                  : "inherit",
              }}
            >
              <ListItemText
                primary={getStudentName(registration.student)}
                sx={{ py: 0.5 }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "background.paper",
          py: 2,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={onClose} sx={{ minWidth: 120 }}>
          إلغاء
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ minWidth: 120 }}
          startIcon={<Checklist sx={{ ml: 1 }} />}
        >
          حفظ
        </Button>
      </Box>
    </Drawer>
  );
};

export default AbsenceCheckList;
