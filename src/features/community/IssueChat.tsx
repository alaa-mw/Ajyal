import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Stack } from "@mui/material";
import { replies } from "./mockData";


const IssueChat = ({ issue, onMarkFAQ }) => {
  const [reply, setReply] = useState("");

  if (!issue) return <Typography>Select an issue</Typography>;

  const issueReplies = replies.filter(r => r.Issues_ID === issue.Issues_ID);

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">{issue.Hashtag}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{issue.body}</Typography>

        <Stack spacing={2} sx={{ mb: 2 }}>
          {issueReplies.map((r) => (
            <Card key={r.Answer_ID} sx={{ p: 1, bgcolor: "grey.100" }}>
              <Typography variant="body2">{r.body}</Typography>
            </Card>
          ))}
        </Stack>

        {/* Reply input */}
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="اكتب ردك هنا..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button variant="contained" onClick={() => { setReply(""); }}>
            Reply
          </Button>
        </Stack>

        {/* Actions */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="outlined" color="primary">
            راجع الاسئلة المتكررة
          </Button>
          {!issue.IsFQA && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onMarkFAQ(issue.Issues_ID)}
            >
              Mark as FAQ
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IssueChat;
