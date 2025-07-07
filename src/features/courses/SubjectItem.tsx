import {
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  Chip,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import theme from "../../styles/mainThem";
import useFetchDataId from "../../hooks/useFetchDataId";
import { Teacher } from "../../interfaces/Teacher";
import { useDispatch } from "react-redux";
import {
  addTeacher,
  removeSubject,
  removeTeacher,
  SubjectTeachers,
} from "./Redux/courseSlice";

interface SubjectItemProps {
  subject: SubjectTeachers; // Now accepts the full subject object
}

const SubjectItem = ({ subject }: SubjectItemProps) => {
  const currentId = subject.subject_id;
  console.log("currentId", currentId); //its exist
  const { data: teachers, isLoading } = useFetchDataId<Teacher[]>(
    `/admin/specificTeachers/${currentId}`,
    currentId // maybe need fix
  );
  const dispatch = useDispatch();

  const handleRemoveSubject = (subjectId: string) => {
    dispatch(removeSubject(subjectId));
  };

  const handleTeacherSelect = (subjectId: string, teacherIds: string[]) => {
    dispatch(addTeacher({ subjectId, teacherIds }));
  };

  const handleRemoveTeacher = (subjectId: string, teacherId: string) => {
    console.log(teacherId);
    dispatch(removeTeacher({ subjectId, teacherId }));
  };

  return (
    <Box
      key={currentId}
      sx={{
        mb: 3,
        p: 2,
        border: `2px solid ${theme.palette.tertiary.main}`,
        borderRight: `12px solid ${theme.palette.tertiary.main}`,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            backgroundColor: theme.palette.tertiary.main,
            borderRadius: 2,
            px: 2,
          }}
        >
          {subject.subject_name}
        </Typography>
        <Button
          size="small"
          color="error"
          onClick={() => handleRemoveSubject(currentId)}
        >
          إزالة
        </Button>
      </Box>

      <FormControl fullWidth>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 0.4,
            color: "primary.main",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          اختر المعلم/المعلمين
        </Typography>
        <Select
          sx={{
            backgroundColor: "white", // White background for select
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e0e0e0", // Default border color
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: "#491B6D", // Purple border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#491B6D", // Purple border when focused
                borderWidth: "1px",
              },
            },
            "& .MuiSelect-select": {
              backgroundColor: "white", // Ensure select area is white
            },
          }}
          multiple
          value={subject?.teachers || []}
          onChange={(e) => {
            // Cast the value to number[] since we know it's a multiple select
            const selectedTeacherIds = e.target.value as string[];
            handleTeacherSelect(currentId, selectedTeacherIds);
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((teacherId) => {
                console.log("selected", selected);
                const teacher = teachers?.data.find((t) => t.id === teacherId);
                return teacher ? (
                  <Chip
                    key={teacherId}
                    label={teacher.name}
                    onDelete={(e) => {
                      e.stopPropagation(); // Prevent the select from opening
                      handleRemoveTeacher(currentId, teacherId);
                    }}
                    onMouseDown={(e) => e.stopPropagation()} // Prevent select focus change
                  />
                ) : null;
              })}
            </Box>
          )}
        >
          {isLoading ? (
            <Box sx={{ p: 2, width: "100%" }}>
              <LinearProgress color="secondary" />
            </Box>
          ) : (teachers?.data?.length ?? 0) > 0 ? (
            teachers?.data.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                <Checkbox checked={subject.teachers.includes(teacher.id)} />
                <Typography>{teacher.name}</Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ justifyContent: "center" }}>
              <Typography variant="subtitle1" color="text.secondary">
                لا يوجد معلمون متاحون
              </Typography>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SubjectItem;
