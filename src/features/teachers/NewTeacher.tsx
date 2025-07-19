import React, { useEffect, useState } from "react";
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
import FormField from "../../components/common/FormField";
import theme from "../../styles/mainThem";
import useSendData from "../../hooks/useSendData";
import { Teacher } from "../../interfaces/Teacher";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { SubjectsByGradeDynamic } from "../../interfaces/Subject";
import useFetchData from "../../hooks/useFetchData";
import { classNames } from "../../data/classNames";

interface FormData {
  name: string;
  phone_number: string;
  email: string;
  bio: string;
  avatar: File | null;
  date_of_contract: string;
  subjects: string[];
}

const NewTeacher = () => {
  const { showSnackbar } = useSnackbar();

  const { mutate: createTeacher } = useSendData<Teacher>("/admin/teachers");
  const { data: subjectsData } = useFetchData<SubjectsByGradeDynamic>(
    "/subjects/all-subjects"
  );

  // ==== states ===
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone_number: "",
    email: "",
    bio: "",
    avatar: null,
    date_of_contract: new Date().toISOString().split("T")[0],
    subjects: [],
  });

  const [selectedClasses, setSelectedClasses] = useState<
    Record<string, boolean>
  >({
    LiteraryBaccalaureate: false,
    ScientificBaccalaureate: false,
    NinthGrade: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [classSubjects, setClassSubjects] = useState<Record<string, string[]>>({
    LiteraryBaccalaureate: [],
    ScientificBaccalaureate: [],
    NinthGrade: [],
  });

  // ==== handle ===
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const toggleClassSelection = (className: string, isChecked: boolean) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [className]: isChecked,
    }));
    // remove class with its subjects
    if (!isChecked) {
      setClassSubjects((prev) => ({
        ...prev,
        [className]: [],
      }));

      setFormData((prev) => ({
        ...prev,
        subjects: prev.subjects.filter(
          (subj) => !subjectsData?.data?.[className]?.some((s) => s.id === subj)
        ),
      }));
    }
  };

  const updateClassSubjects = (className: string, subjectIds: string[]) => {
    setClassSubjects((prev) => ({
      ...prev,
      [className]: subjectIds,
    }));

    setFormData((prev) => {
      // Remove existing subjects for this class
      const filtered = prev.subjects.filter(
        (subjId) =>
          !subjectsData?.data?.[className]?.some((s) => s.id === subjId)
      );

      // Add new selections
      return {
        ...prev,
        subjects: [...filtered, ...subjectIds],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTeacher(formData, {
      onSuccess: () => showSnackbar("تم تسجيل بيانات المعلم بنجاح", "success"),
      onError: () =>
        showSnackbar("خطأ ما ! تأكد من صحة البيانات المدخلة", "error"),
    });
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 0, sm: 3 } }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "right" }}
      >
        تسجيل معلم جديد
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              mb: 3,
            }}
          >
            <Box sx={{ order: { xs: 1, sm: 2 }, mx: 4, alignSelf: "center" }}>
              <label htmlFor="profile-image">
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    cursor: "pointer",
                    border: `2px dashed ${theme.palette.secondary.dark}`,
                    borderRadius: 2,
                    mx: "auto",
                    backgroundColor: `${theme.palette.secondary.main}80`,
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
              <Typography
                variant="body1"
                color="gray"
                textAlign={"center"}
                mt={1}
              >
                انقر لتحميل صورة
              </Typography>
            </Box>

            <Box
              sx={{ order: { xs: 2, sm: 1 }, width: { xs: "100%", sm: "60%" } }}
            >
              <FormField
                label="الاسم الكامل"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="أحمد محمد"
              />
              <FormField
                label="رقم الهاتف"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                placeholder="09XXXXXXXX"
              />
              <FormField
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="خريج جامعة دمشق - كلية العلوم \nخبرة 4 سنوات"
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

          <Box>
            <InputLabel>الصفوف</InputLabel>
            {Object.entries(classNames).map(([key, arabicName]) => (
              <Box key={key} sx={{ mb: 2 }}>
                <FormControlLabel
                  label={arabicName}
                  control={
                    <Checkbox
                      checked={selectedClasses[key] || false}
                      onChange={(e) =>
                        toggleClassSelection(key, e.target.checked)
                      }
                    />
                  }
                />

                {selectedClasses[key] && (
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel>مواد {arabicName}</InputLabel>
                    <Select
                      multiple
                      value={formData.subjects.filter((subjId) =>
                        subjectsData?.data?.[key]?.some((s) => s.id === subjId)
                      )}
                      onChange={(e) =>
                        updateClassSubjects(key, e.target.value as string[])
                      }
                      label={`مواد ${arabicName}`}
                    >
                      {subjectsData?.data?.[key]?.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            ))}
          </Box>

          <Button
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
