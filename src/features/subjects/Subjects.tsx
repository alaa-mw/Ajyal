import { useState } from "react";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { BookmarkBorder } from "@mui/icons-material";
import { classNames } from "../../static/classNames";
import theme from "../../styles/mainThem";
import useFetchData from "../../hooks/useFetchData";
import { Subject, SubjectsByGradeDynamic } from "../../interfaces/Subject";
import useFetchDataId from "../../hooks/useFetchDataId";
import SubjectTopicsCard from "./subjectTopicsCard";
import AddSubjectDialog from "./AddSubjectDialog";
import useSendData from "../../hooks/useSendData";
import { useSnackbar } from "../../contexts/SnackbarContext";

const Subjects = () => {
  const { showSnackbar } = useSnackbar();
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("");
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useFetchData<SubjectsByGradeDynamic>("/subjects/all-subjects");

  const { data: subjectWithTopics } = useFetchDataId<Subject>(
    `/subjects/${expandedSubjectId}/with-topics`,
    expandedSubjectId as string | undefined
  );

  const { data: archivedSubjects } = useFetchData<SubjectsByGradeDynamic>(
    "/subjects/all-archived-subjects"
  );

  const { mutate: archive } = useSendData( // fix
    `/subjects/archive/${expandedSubjectId}`
  );
  const handleAddSubject = (label: string) => {
    setOpen(true);
    setClassName(label);
  };
  const handleCardClick = (subjectId: string) => {
    setExpandedSubjectId((prevId) => (prevId === subjectId ? null : subjectId));
  };
  const handleCardArchive = () => {
    archive(
      {},
      {
        onSuccess: (response) => {
          showSnackbar(response.message, "success");
        },
        onError: (error) => showSnackbar(error.message, "error"),
      }
    );
  };

  if (isLoadingSubjects) {
    return <CircularProgress />;
  }

  if (subjectsError) {
    return <Typography color="error">Failed to load subjects.</Typography>;
  }

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 1,
          fontWeight: "bold",
        }}
      >
        المناهج
      </Typography>

      <Stepper
        orientation="vertical"
        connector={null}
        sx={{ p: 1, borderRadius: 2 }}
      >
        {subjects &&
          Object.entries(classNames).map(([key, label]) => (
            <Step key={key} active>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "secondary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookmarkBorder sx={{ color: "white", fontSize: 16 }} />
                  </Box>
                )}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%", // Ensure the box takes full width
                    ml: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "text.primary" }}
                  >
                    {label}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddSubject(label)}
                  >
                    إضافة مادة
                  </Button>
                </Box>
              </StepLabel>

              <Grid
                container
                spacing={2}
                sx={{
                  p: 2,
                  mr: 2,
                  borderRight: `1px solid ${theme.palette.divider}`,
                  pb: 4,
                }}
              >
                {subjects.data?.[key] && subjects.data[key].length > 0 ? (
                  subjects?.data[key]?.map((subject: Subject) => {
                    const isExpanded = expandedSubjectId === subject.id;

                    return (
                      <Grid key={subject.id} sx={{ xs: 12, sm: 6, md: 4 }}>
                        <SubjectTopicsCard
                          subject={subject}
                          onClick={() => handleCardClick(subject.id)}
                          onArchive={handleCardArchive}
                          expanded={isExpanded}
                          topics={
                            isExpanded
                              ? subjectWithTopics?.data.topics || []
                              : []
                          }
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Typography sx={{ p: 2, color: "text.secondary" }}>
                    لا توجد مواد دراسية لهذه المرحلة.
                  </Typography>
                )}
                {archivedSubjects?.data?.[key] &&
                subjects?.data[key].length > 0 ? (
                  archivedSubjects?.data[key]?.map((subject: Subject) => {
                    const isExpanded = expandedSubjectId === subject.id;

                    return (
                      <Grid key={subject.id} sx={{ xs: 12, sm: 6, md: 4 }}>
                        <SubjectTopicsCard
                          subject={subject}
                          onClick={() => handleCardClick(subject.id)}
                          expanded={isExpanded}
                          topics={
                            isExpanded
                              ? subjectWithTopics?.data.topics || []
                              : []
                          }
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Typography sx={{ p: 2, color: "text.secondary" }}>
                    لا توجد مواد مؤرشفة.
                  </Typography>
                )}
              </Grid>
            </Step>
          ))}
      </Stepper>
      <AddSubjectDialog
        open={open}
        onClose={() => setOpen(false)}
        className={className}
      />
    </>
  );
};

export default Subjects;
