import React, { useState, useMemo } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, QrCodeScanner } from "@mui/icons-material";
import { Student } from "../../../../interfaces/Student";

interface StudentSearchProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
  selectedStudent: Student | null;
  onToggleMode: () => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  students,
  onStudentSelect,
  selectedStudent,
  onToggleMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() =>
    students.filter((student) =>
      `${student.first_name} ${student.father_name} ${student.last_name} ${student.id}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ),
    [students, searchTerm]
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Autocomplete
          fullWidth
          options={filteredStudents}
          getOptionLabel={(option) =>
            `${option.first_name} ${option.father_name} ${option.last_name} (${option.id})`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="ابحث عن الطالب"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon sx={{ ml: 1 }} />,
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          value={selectedStudent}
          onChange={(_, newValue) => newValue? onStudentSelect(newValue): ""}
          noOptionsText="لا يوجد طلاب مطابقين"
        />
        <Button
          variant="outlined"
          startIcon={<QrCodeScanner />}
          // onClick={() => setOpenScanner(true)}
        >
          مسح QR Code
        </Button>
      </Box>
      <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
        طالب جديد ؟{" "}
        <Button
          style={{ color: "primary.main", textDecoration: "underline" }}
          onClick={onToggleMode}
        >
          إضافة للنظام
        </Button>
      </Typography>
    </Box>
  );
};

export default StudentSearch;