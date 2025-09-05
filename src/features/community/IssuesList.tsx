import {
  List,
  ListItem,
  ListItemText,
  Typography,
  alpha,
  Box,
  Paper,
} from "@mui/material";
import theme from "../../styles/mainThem";
import { Issue } from "../../interfaces/Community";

interface props {
  issues: Issue[];
  onSelect: (issue: Issue) => void;
}

const IssuesList = ({ issues, onSelect }:props) => {
  // Helper function to format the date
  const formatTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        الأسئلة الواردة
      </Typography>
      <List >
        {issues.map((issue) => (
          <ListItem
            key={issue.id}
            onClick={() => onSelect(issue)}
            sx={{
              bgcolor: alpha(theme.palette.tertiary.main, 0.2),
              mb: 1,
              borderRadius: 2,
              p: 2,
              "&:hover": {
                cursor: "pointer",
                bgcolor: alpha(theme.palette.tertiary.main, 0.3),
              },
            }}
          >
            {/* Main content on the left */}
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {issue.author.name}
                  </Typography>
                  {issue.is_fqa && (
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ mr: 1, fontWeight: "bold" }}
                    >
                      (FAQ)
                    </Typography>
                  )}
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1, // Truncate to one line
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis", // A better way to handle truncation
                  }}
                >
                  {issue.body.substring(0, 40) + "..."}
                </Typography>
              }
            />
            {/* Time and date on the far right */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ flexShrink: 0, ml: 2, textAlign: "right" }}
            >
              {formatTime(issue.created_at)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default IssuesList;
