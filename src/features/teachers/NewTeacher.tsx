import React from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FormField from "../../components/form/FormField";
import theme from "../../styles/mainThem";

interface SubjectType {
  id: number;
  name: string;
}

interface ClassType {
  id: number;
  name: string;
  subjects: SubjectType[];
}

const CLASSES: ClassType[] = [
  {
    id: 1,
    name: "الصف التاسع",
    subjects: [
      { id: 101, name: "رياضيات" },
      { id: 102, name: "فيزياء" },
      { id: 103, name: "كيمياء" },
    ],
  },
  {
    id: 2,
    name: "الصف العاشر",
    subjects: [
      { id: 201, name: "رياضيات" },
      { id: 202, name: "أحياء" },
      { id: 203, name: "علوم" },
    ],
  },
  {
    id: 3,
    name: "الصف الحادي عشر علمي",
    subjects: [
      { id: 301, name: "رياضيات" },
      { id: 302, name: "فيزياء" },
      { id: 303, name: "كيمياء" },
    ],
  },
  {
    id: 4,
    name: "الصف الثاني عشر علمي",
    subjects: [
      { id: 401, name: "رياضيات" },
      { id: 402, name: "فيزياء" },
      { id: 403, name: "أحياء" },
    ],
  },
];

interface SelectedClass {
  id: number;
  selectedSubjects: number[];
}

interface FormData {
  name: string;
  phone_number: string;
  email: string;
  description: string;
  profileImage: File | null;
  selectedClasses: SelectedClass[]; // Changed to array of objects
}

const NewTeacher = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    phone_number: "",
    email: "",
    description: "",
    profileImage: null,
    selectedClasses: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleClassCheck = (classId: number, isChecked: boolean) => {
    setFormData((prev) => {
      if (isChecked) {
        return {
          ...prev,
          selectedClasses: [
            ...prev.selectedClasses,
            { id: classId, selectedSubjects: [] }, // Add new class with empty subjects
          ],
        };
      } else {
        return {
          ...prev,
          selectedClasses: prev.selectedClasses.filter((c) => c.id !== classId), // Remove the class
        };
      }
    });
  };

  const handleSubjectSelect = (
    classId: number,
    selectedSubjectIds: number[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      selectedClasses: prev.selectedClasses.map((c) =>
        c.id === classId ? { ...c, selectedSubjects: selectedSubjectIds } : c
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: {xs:0 , sm:3} }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "right" }}
      >
        تسجيل معلم جديد
      </Typography>

      <Paper elevation={3} sx={{ p: {xs:2 , sm:4}, borderRadius: 2  }}>
        <form onSubmit={handleSubmit} >
          {/* Personal Information Section */}
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", textAlign: "right" }}
          >
            المعلومات الشخصية
          </Typography>
          <Divider
            sx={{
              mb: 2,
              height: 2,
              background: theme.palette.gradient.primary,
            }}
          />
          {/* Responsive Grid Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "space-between" },
              alignItems: "center",
              mb: 3,
              gap: 3,
            }}
          >
            <Box
              sx={{
                order: { xs: 1, sm: 2 },
                mx: 4,
              }}
            >
              <label htmlFor="profile-image" style={{ display: "block" }}>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    cursor: "pointer",
                    border: `2px dashed ${theme.palette.secondary.dark}`,
                    borderRadius: 2,
                    mx: "auto",
                    backgroundColor: `${theme.palette.secondary.main}80`, // Added 50% opacity (hex 80)
                  }}
                />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </Box>
            {/* Form Fields - Bottom on mobile, left on desktop */}
            <Box
              sx={{
                order: { xs: 2, sm: 1 },
                width: { xs: "100%", sm: "60%" },
              }}
            >
              <FormField
                label="الاسم الكامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="أحمد محمد"
              />
              <FormField
                label="رقم الهاتف"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                placeholder="09XXXXXXXX"
              />
              <FormField
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@domain.com"
              />
            </Box>
          </Box>

          {/* Education Section */}
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", textAlign: "right" }}
          >
            التحصيل العلمي
          </Typography>
          <Divider
            sx={{
              mb: 2,
              height: 2,
              background: theme.palette.gradient.primary,
            }}
          />
          <Box sx={{ mb: 3 }}>
            <FormField
              label="الوصف"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={"خريج جامعة دمشق - كلية العلوم \nخبرة 4 سنوات"}
              multiline
            />
          </Box>
          {/* Teaching Information Section */}
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", textAlign: "right" }}
          >
            المعلومات التدريسية
          </Typography>
          <Divider
            sx={{
              mb: 2,
              height: 2,
              background: theme.palette.gradient.primary,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <InputLabel>الصفوف</InputLabel>
            {CLASSES.map((cls) => {
              const selectedClass = formData.selectedClasses.find(
                (c) => c.id === cls.id
              );
              const isClassSelected = !!selectedClass;

              return (
                <Box key={cls.id} sx={{ mb: 2 }}>
                  <FormControlLabel
                    label={cls.name}
                    control={
                      <Checkbox
                        checked={isClassSelected}
                        onChange={(e) =>
                          handleClassCheck(cls.id, e.target.checked)
                        }
                      />
                    }
                  />

                  {isClassSelected && (
                    <FormControl fullWidth sx={{ mt: 1 }}>
                      <InputLabel>مواد {cls.name}</InputLabel>
                      <Select
                        multiple
                        value={selectedClass?.selectedSubjects || []}
                        onChange={(e) =>
                          handleSubjectSelect(
                            cls.id,
                            e.target.value as number[]
                          )
                        }
                        label={`مواد ${cls.name}`}
                      >
                        {cls.subjects.map((subject) => (
                          <MenuItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
              );
            })}
          </Box>

          <Button
            // fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              background: theme.palette.gradient.primary,
              fontSize: "1.1rem",
              mx: "40%",
            }}
          >
            حفظ البيانات
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default NewTeacher;
