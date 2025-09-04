import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import IssuesList from "../../features/community/IssuesList";
import IssueChat from "../../features/community/IssueChat";
import { Issue } from "../../interfaces/Community";
import useFetchDataId from "../../hooks/useFetchDataId";
import useFetchData from "../../hooks/useFetchData";
import { Curriculum } from "../../interfaces/Curriculum";

const QuestionsPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [activeTab, setActiveTab] = useState<"issues" | "fqa">("issues");
  const [cId, setCId] = useState<string>();
  const { data: teacherCurriculum } = useFetchData<Curriculum[]>(
    "/teacher/get-all-my-subjects-with-course"
  );
  const { data: issues } = useFetchDataId<Issue[]>(
    `/issue/get-normal-issues/${cId}`,
    cId
  );
  const { data: fqaIssues } = useFetchDataId<Issue[]>(
    `/issue/get-is-fqa-issues/${cId}`,
    cId
  );
  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        الأسئلة
      </Typography>
      <FormControl sx={{ width: 300, mb: 2, backgroundColor: "#fff" }}>
        <InputLabel sx={{ mr: 2 }}>المنهج الدراسي</InputLabel>
        <Select
          name="curriculum_id"
          value={cId || ""}
          onChange={(e) => setCId(e.target.value)}
        >
          <MenuItem value="">اختر المنهج الدراسي</MenuItem>{" "}
          {teacherCurriculum?.data.map((tc) => (
            <MenuItem key={tc.id} value={tc.id}>
              {`${tc.subject.name} - ${tc.course.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={4}>
        <Grid size={{ s: 12, md: 3.5 }}>
          {/* أزرار التبويب */}
          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-between",
              gap: 1,
              my: 1,
              mx: 2,
            }}
          >
            {["issues", "fqa"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "contained" : "outlined"}
                onClick={() => {
                  setActiveTab(tab as SetStateAction<"issues" | "fqa">);
                }}
                sx={{ borderRadius: 10 }}
              >
                {tab === "issues" ? "أسئلة الطلاب" : "الأسئلة المتكررة"}
              </Button>
            ))}
          </Box>
          {activeTab === "issues" ? (
            issues && issues?.data.length > 0 ? (
              <IssuesList issues={issues?.data} onSelect={setSelectedIssue} />
            ) : (
              <div>لا يوجد أسئلة !</div>
            )
          ) : fqaIssues && fqaIssues.data.length > 0 ? (
            <IssuesList issues={fqaIssues?.data} onSelect={setSelectedIssue} />
          ) : (
            <div>لا يوجد أسئلة !</div>
          )}
        </Grid>
        <Grid size={{ s: 12, md: 8.5 }}>
          {selectedIssue && <IssueChat issue={selectedIssue} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionsPage;
