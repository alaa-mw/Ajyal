import { Box, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { grey } from "@mui/material/colors";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import theme from "../../styles/mainThem";

const SharedFiles = () => {
  // Mock data for files
  const files = [
    { name: "Project Proposal.pdf", subject: "Business" },
    { name: "Financial Report.xlsx", subject: "Finance" },
    { name: "User Manual.docx", subject: "Documentation" },
    { name: "Meeting Notes.txt", subject: "General" },
    { name: "Design Assets.zip", subject: "Creative" },
    { name: "Research Paper.pdf", subject: "Academic" },
    { name: "Presentation.pptx", subject: "Marketing" },
    { name: "Code Repository.zip", subject: "Development" },
  ];

  return (
    <Box
      sx={{
        height: "250px",
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <TabContext value={"1"}>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={"1"}
            sx={{
              "& .MuiTab-root": {
                color: "#fff",
                width: "50%",
                transition: "all 0.3s ease",
                mr: 2
              },
              bgcolor: "tertiary.main",
              borderRadius: 2,
              "& .Mui-selected": {
                bgcolor: "white",
                color: "black",
                fontWeight: "bold",
                borderTop: `7px solid ${theme.palette.tertiary.main}`,
                borderRadius: "20px 20px 0px 0px",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Tab label="الملفات المشاركة" value="1" />
          </Tabs>
        </Box>
        <TabPanel value="1" sx={{ py: 2, height: "calc(100% - 48px)" }}>
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
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: grey[400],
                borderRadius: '3px',
              },
            }}
          >
            {files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 1,
                  bgcolor: grey[100],
                  "&:hover": {
                    bgcolor: grey[200],
                    cursor: "pointer",
                  },
                }}
              >
                <InsertDriveFileIcon sx={{ color: grey[700], fontSize: "40px", mb: 1 }} />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: "medium", 
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%"
                  }}
                >
                  {file.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: grey[600],
                    textAlign: "center"
                  }}
                >
                  {file.subject}
                </Typography>
              </Box>
            ))}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SharedFiles;