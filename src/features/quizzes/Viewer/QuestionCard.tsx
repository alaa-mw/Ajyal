import {
  Box,
  Typography,
  Paper,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Question } from "../../../interfaces/Quiz";

interface Props {
  question: Question;
  index: number;
}
const QuestionCard = ({ question, index }: Props) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }} key={question.id}>
      {/* Question Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1">السؤال {index + 1}</Typography>
        <Typography variant="caption">{question.mark} نقاط</Typography>
      </Box>

      {/* Question Image */}
      {question.image && (
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Avatar
            variant="rounded"
            src={`https://example.com/storage/${question.image.path}`}
            sx={{ width: "100%", height: "auto", maxHeight: 300 }}
          >
            <ImageIcon />
          </Avatar>
        </Box>
      )}

      {/* Question Text */}
      <Typography variant="h6" component="h2" gutterBottom>
        {question.question_text}
      </Typography>

      {/* Hint */}
      {question.hint && (
        <Alert
          icon={<HelpOutlineIcon sx={{ ml: 1 }} />}
          severity="info"
          sx={{ mb: 3 }}
        >
          تلميح: {question.hint}
        </Alert>
      )}

      {/* Display choices (read-only) */}
      {question.choices && question.choices.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            الخيارات:
          </Typography>
          <List>
            {question.choices.map((choice) => (
              <ListItem
                key={choice.id}
                sx={{
                  backgroundColor: choice.is_correct ? "#e8f5e9" : "inherit",
                  border: choice.is_correct ? "1.5px solid #66c269ff" : "none",
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={choice.choice_text}
                  primaryTypographyProps={{
                    color: choice.is_correct ? "#2e7d32" : "inherit",
                    fontWeight: choice.is_correct ? "bold" : "normal",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Display sub-questions (read-only) */}
      {question.children && question.children.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            الأسئلة الفرعية:
          </Typography>

          <List>
            {question.children.map((child) => (
              <Paper key={child.id} elevation={2} sx={{ mb: 2, p: 2 }}>
                <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                  <ListItemText
                    primary={child.question_text}
                    secondary={
                      child.hint && (
                        <Typography variant="caption" color="text.secondary">
                          تلميح: {child.hint}
                        </Typography>
                      )
                    }
                  />
                </ListItem>

                {child.choices && child.choices.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <List>
                      {child.choices.map((choice) => (
                        <ListItem
                          key={choice.id}
                          sx={{
                            backgroundColor: choice.is_correct
                              ? "#e8f5e9"
                              : "inherit",

                            border: choice.is_correct
                              ? "1.5px solid #66c269ff"
                              : "none",
                            borderRadius: 1,
                          }}
                        >
                          <ListItemText
                            primary={choice.choice_text}
                            primaryTypographyProps={{
                              color: choice.is_correct ? "#2e7d32" : "inherit",
                              fontWeight: choice.is_correct ? "bold" : "normal",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Paper>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default QuestionCard;
