import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import useSendData from "../../../hooks/useSendData";
import { AccessTime } from "@mui/icons-material";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { forwardRef, useImperativeHandle } from "react";

export interface ReviewStepRef {
  done: () => Promise<void>;
}

export const ReviewStep = forwardRef<ReviewStepRef | undefined>(
  function ReviewStep(props, ref) {
    const { showSnackbar } = useSnackbar();
    const quiz = useSelector((state: RootState) => state.quiz);

    const { mutate: availableQuiz } = useSendData("/quiz/change_available");

    const handleAvailableQuiz = () => {
      return new Promise<void>((resolve, reject) => {
        availableQuiz(
          {
            quiz_id: quiz.id,
          },
          {
            onSuccess: (response) => {
              showSnackbar(response.message, "success");
              resolve();
            },
            onError: (error) => {
              showSnackbar(error.message, "error");
              reject(error);
            },
          }
        );
      });
    };

    const done = async () => {
      await handleAvailableQuiz();
    };

    useImperativeHandle(ref, () => ({
      done,
    }));
    return (
      <Box px={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          مراجعة الاختبار النهائية
        </Typography>

        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <List
            sx={{
              mb: 1,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              "& .MuiListItem-root": {
                width: "auto",
                padding: 0,
                flex: "1 1 auto",
              },
              "& .MuiDivider-root": {
                height: 28,
                my: "auto",
              },
            }}
          >
            <ListItem sx={{ minWidth: 150 }}>
              <ListItemText
                primary="اسم الاختبار"
                secondary={quiz.name || "غير محدد"}
                secondaryTypographyProps={{ variant: "body1" }}
                sx={{ my: 0 }}
              />
            </ListItem>

            <Divider orientation="vertical" flexItem />

            <ListItem sx={{ minWidth: 150 }}>
              <ListItemText
                primary="نوع الاختبار"
                secondary={
                  quiz.type === "Timed" ? "محدد بوقت" : "غير محدد بوقت"
                }
                sx={{ my: 0 }}
              />
              {quiz.type === "Timed" && (
                <Chip
                  icon={<AccessTime fontSize="small" />}
                  label={`${quiz.duration} دقيقة`}
                  size="small"
                  sx={{
                    p: 1,
                    backgroundColor: "orange",
                    color: "white",
                    "& .MuiChip-icon": {
                      color: "white",
                      fontSize: "1rem",
                      marginX: "2px",
                    },
                  }}
                />
              )}
            </ListItem>

            <Divider orientation="vertical" flexItem />

            <ListItem sx={{ minWidth: 120 }}>
              <ListItemText
                primary="عدد الأسئلة"
                secondary={quiz.questions.length}
                sx={{ my: 0 }}
              />
            </ListItem>
          </List>

          <Alert
            severity="info"
            sx={{
              mb: 1,
              "& .MuiAlert-icon": {
                alignItems: "center",
              },
            }}
          >
            <Typography variant="body2" component="div">
              <Box
                component="strong"
                sx={{ display: "block", mb: 1, fontSize: "0.875rem" }}
              >
                تعليمات:
              </Box>
              <Box
                component="ul"
                sx={{
                  pl: 2,
                  m: 0,
                  "& li": {
                    mb: 0.5,
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                  },
                }}
              >
                <Box component="li" sx={{ display: "flex" }}>
                  <Box component="span">اضغط على</Box>
                  <Chip
                    label="إنشاء الاختبار"
                    size="small"
                    color="primary"
                    sx={{ mx: 1, height: "auto", py: 0.25 }}
                  />
                  <Box component="span">لنشره بشكل رسمي</Box>
                </Box>
                <Box component="li" sx={{ display: "flex" }}>
                  <Box component="span">إذا لم تنتهِ من تعبئته اضغط على</Box>
                  <Chip
                    label="الحفظ كمسودة"
                    size="small"
                    color="secondary"
                    sx={{ mx: 1, height: "auto", py: 0.25 }}
                  />
                </Box>
              </Box>
            </Typography>
          </Alert>

          <Alert severity="warning" sx={{ mb: 1 }}>
            <Typography variant="body2">
              سيتم حفظ جميع التغييرات عند المتابعة
            </Typography>
          </Alert>
        </Paper>
      </Box>
    );
  }
);
