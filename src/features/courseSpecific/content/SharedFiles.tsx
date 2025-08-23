import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { grey } from "@mui/material/colors";
import theme from "../../../styles/mainThem";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { file } from "../../../interfaces/File";
import { Download } from "@mui/icons-material";

const SharedFiles = () => {
  const { selectedCourseId } = useSelectedCourse();
  const { data: files } = useFetchDataId<file[]>(
    `/course/all-files-for-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  // Construct the full URL for the PDF
  const getPdfUrl = (filePath) => {
    const baseUrl = "http://127.0.0.1:8000/";
    return `${baseUrl}${filePath}`;
  };

  const handleDownload = (pdf) => {
    const link = document.createElement("a");
    link.href = getPdfUrl(pdf.file_path);
    link.download = `${pdf.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.primary.main,
          borderRadius: "inherit",
          px: 3,
          py: 1,
        }}
      >
        <Typography variant="h6" color="white" fontWeight="bold">
          الملفات المشاركة
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: 2,
          p: 1,
          overflowX: "auto",
          height: "100%",
          alignItems: "flex-start",
          "&::-webkit-scrollbar": {
            height: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: grey[400],
            borderRadius: "3px",
          },
        }}
      >
        {files?.data.map((file, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              borderRadius: 1,
              bgcolor: grey[200],
              "&:hover": {
                boxShadow: 3,
                transform: "translateY(-1px)",
                transition: "all 0.6s ease",
              },
            }}
          >
            <InsertDriveFileIcon
              sx={{ color: grey[700], fontSize: "40px", mb: 1 }}
            />

            <Typography
              variant="body1"
              sx={{
                fontWeight: "medium",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {file.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: grey[600],
                textAlign: "center",
              }}
            >
              {file.subject.name}
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<Download />}
              onClick={() => handleDownload(file)}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              تحميل
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SharedFiles;
