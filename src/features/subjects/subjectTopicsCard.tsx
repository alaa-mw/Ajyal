import {
  Typography,
  Paper,
  Chip,
  Grid,
  Collapse,
  Box,
  alpha,
  Button,
} from "@mui/material";
import { Subject, Topic } from "../../interfaces/Subject";
import theme from "../../styles/mainThem";

interface Props {
  subject: Subject;
  onClick: () => void;
  onArchive?: () => void;
  topics: Topic[];
  expanded: boolean;
}
// FIX: Component name is now PascalCase (SubjectTopicsCard)
const SubjectTopicsCard = ({
  subject,
  onClick,
  topics,
  expanded,
  onArchive,
}: Props) => {
  return (
    <Paper
      elevation={expanded ? 4 : 1}
      sx={{
        minWidth: 180,
        maxWidth: 190,
        minHeight: 100,
        p: 2,
        cursor: "pointer",
        borderRadius: 3,
        transition: "box-shadow 0.3s",
        border: ` 1px solid ${theme.palette.tertiary.main}`,
        bgcolor: alpha(theme.palette.tertiary.main, 0.1),
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
      onClick={onClick}
    >
      <Typography variant="h6" fontWeight="bold">
        {subject.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap gutterBottom>
        {subject.description}
      </Typography>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2, minHeight: 50 }}>
          <Grid container spacing={1}>
            {topics.length > 0 ? (
              topics.map((topic) => (
                <Grid key={topic.id}>
                  <Chip
                    sx={{
                      bgcolor: "tertiary.main",
                      color: "white",
                    }}
                    label={topic.topic_name}
                  />
                </Grid>
              ))
            ) : (
              <Typography
                variant="caption"
                sx={{ p: 1, color: "text.secondary" }}
              >
                No topics found for this subject.
              </Typography>
            )}
          </Grid>
          {onArchive && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" color="primary" onClick={onArchive}>
                ارشفة المادة
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SubjectTopicsCard;
