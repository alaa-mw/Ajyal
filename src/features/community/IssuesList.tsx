// IssuesList.jsx
import { List, ListItem, ListItemText, Typography, alpha } from "@mui/material";
import { issues } from "./mockData";
import theme from "../../styles/mainThem";

const IssuesList = ({ onSelect }) => {
  return (
    <List>
      {issues.map((issue) => (
        <ListItem
          key={issue.Issues_ID}
          button
          sx={{ bgcolor: alpha(theme.palette.tertiary.main, 0.2), m:1 , borderRadius:2 }}
          onClick={() => onSelect(issue)}
        >
          <ListItemText
            primary={issue.Hashtag}
            secondary={issue.body.substring(0, 40) + "..."}
          />
          {issue.IsFQA && (
            <Typography variant="caption" color="primary">
              FAQ
            </Typography>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default IssuesList;
