// src/components/CourseActionsToolbar.tsx
import {
  TextField,
  Button,
  Stack,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../../../styles/mainThem";
import { useState } from "react";
import { ClassRoom } from "../../../interfaces/ClassRoom";

interface CourseActionsToolbarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedClassroom: string;
  onClassroomChange: (classroomId: string) => void;
  classRooms: ClassRoom[];
  onAddNewStudent: () => void;
}

const CourseActionsToolbar = ({
  searchTerm,
  onSearchChange,
  selectedClassroom,
  onClassroomChange,
  classRooms,
  onAddNewStudent,
}: CourseActionsToolbarProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Stack direction="column" spacing={2}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Field - 3/4 width */}
          <Grid size={{ xs: 12, md: 9 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ابحث عن طالب..."
              value={searchTerm}
              onChange={onSearchChange}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Add Student Button - 1/4 width */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onAddNewStudent}
              fullWidth
              sx={{
                // whiteSpace: "nowrap",
                minWidth: "fit-content",
                // fontSize:".7rem"
              }}
            >
              تسجيل طالب جديد
            </Button>
          </Grid>
        </Grid>
        {/* Classroom Accordion Filter */}
        <Accordion
          expanded={expanded}
          onChange={handleAccordionChange}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: "auto",
              py: 0,
              "& .MuiAccordionSummary-content": {
                my: 1,
              },
              "&.Mui-expanded": {
                minHeight: "auto !important",
                my: 0,
              },
            }}
          >
            <Typography variant="subtitle1">
              الشعب الدراسية
              {selectedClassroom !== "all" && (
                <Chip
                  label={`محدد: ${
                    classRooms.find((c) => c.id === selectedClassroom)
                      ?.class_number || ""
                  }`}
                  size="small"
                  sx={{ bgcolor: theme.palette.tertiary.main, mx: 1 }}
                />
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  onClassroomChange("all");
                  setExpanded(false);
                }}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  bcolor:
                    selectedClassroom === "all"
                      ? "action.selected"
                      : "background.paper",
                      py:0
                }}
              >
                كل الشعب
              </Button>
              <Button
                variant={"outlined"}
                onClick={() => {
                  onClassroomChange("-1");
                  setExpanded(false);
                }}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  bcolor:
                    selectedClassroom === "-1"
                      ? "action.selected"
                      : "background.paper",
                      py:0
                }}
              >
                بلا شعبة
              </Button>
              {classRooms.map((cls) => (
                <Box
                  key={cls.id}
                  onClick={() => {
                    onClassroomChange(cls.id);
                    setExpanded(false);
                  }}
                  sx={{
                    px: 1,
                    borderRadius: 1,
                    cursor: "pointer",
                    bgcolor:
                      selectedClassroom === cls.id
                        ? "action.selected"
                        : "background.paper",
                    "&:hover": { bgcolor: "action.hover" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{cls.class_number}</Typography>
                  <Chip
                    label={cls.class_number ? "تم التفقد" : "لم يتم التفقد"}
                    size="small"
                    color={cls.class_number ? "success" : "warning"}
                  />
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Card>
  );
};

export default CourseActionsToolbar;
