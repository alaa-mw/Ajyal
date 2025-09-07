import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Drawer,
  Box,
  IconButton,
  Chip,
  Skeleton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { getStudentName } from "../../../utils/getStudentName";
import { StudentResult } from "../../../interfaces/Quiz";

interface StudentResultsListProps {
  totalResult?: string;
  students?: StudentResult[];
  isLoading?: boolean;
  open: boolean;
  onClose: () => void;
}

const StudentResultsList: React.FC<StudentResultsListProps> = ({
  totalResult = "100",
  students = [],
  isLoading = false,
  open,
  onClose,
}) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          height: "80vh",
          width: 300,
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
          نتائج الطلاب
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Chip
        label={`العلامة الكاملة: ${totalResult}`}
        color="success"
        variant="outlined"
        sx={{
          ml: 2,
          fontWeight: "bold",
        }}
      />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List dense>
          {isLoading ? (
            [...Array(4)].map((_,index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid #eee",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <ListItemText sx={{ py: 0.5 }}>
                  <Skeleton variant="text" width="60%" />
                </ListItemText>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  <Skeleton variant="text" width={30} />
                </Typography>
              </ListItem>
            ))
          ) : students.length == 0 ? (
            <Typography color="gray" justifySelf={"center"}>
              لا يوجد متقدمين
            </Typography>
          ) : (
            students.map((studentResult) => (
              <ListItem
                key={studentResult.id}
                sx={{
                  borderBottom: "1px solid #eee",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <ListItemText
                  primary={getStudentName(studentResult.student)}
                  sx={{ py: 0.5 }}
                />
                <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
                  {studentResult.result || 0}
                </Typography>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default StudentResultsList;
