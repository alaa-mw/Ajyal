// src/components/CourseActionsToolbar.tsx
import {
  TextField,
  Button,
  Stack,
  Card,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../../styles/mainThem";
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
        <Box
          sx={{
            px: 2,
          }}
        >
          {/* العنوان */}

          {/* خيارات التصفية */}
          <Stack direction="row" spacing={1} sx={{ overflowX: "auto", p: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              الشعب الدراسية:
            </Typography>
            <Paper />
            {/* خيار "كل الشعب" */}
            <ClassroomCard
              id="all"
              selectedId={selectedClassroom}
              onClick={onClassroomChange}
              title="كل الشعب"
            />
            <ClassroomCard
              id="-1"
              selectedId={selectedClassroom}
              onClick={onClassroomChange}
              title="بلا شعبة"
            />

            {/* البطاقات الخاصة بكل شعبة */}
            {classRooms.map((cls) => (
              <ClassroomCard
                key={cls.id}
                id={cls.id}
                selectedId={selectedClassroom}
                onClick={onClassroomChange}
                title={cls.class_number}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default CourseActionsToolbar;

const ClassroomCard = ({ id, selectedId, onClick, title }) => {
  const isSelected = selectedId === id;

  return (
    <Paper
      onClick={() => onClick(id)}
      elevation={isSelected ? 3 : 0}
      sx={{
        minWidth: 100,
        p: 0.7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: `2px solid ${
          isSelected ? theme.palette.primary.main : theme.palette.grey[300]
        }`,
        borderRadius: 2,
        boxShadow: isSelected
          ? `0 0 0 2px ${theme.palette.primary.light}`
          : "none",
        backgroundColor: isSelected
          ? theme.palette.action.selected
          : "background.paper",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
    </Paper>
  );
};
