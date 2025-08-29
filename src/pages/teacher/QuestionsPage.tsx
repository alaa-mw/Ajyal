import { Grid } from "@mui/material";
import React, { useState } from "react";
import IssuesList from "../../features/community/IssuesList";
import IssueChat from "../../features/community/IssueChat";
import { issues } from "../../features/community/mockData";

const QuestionsPage = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [allIssues, setAllIssues] = useState(issues);

  const handleMarkFAQ = (id) => {
    setAllIssues((prev) =>
      prev.map((i) => (i.Issues_ID === id ? { ...i, IsFQA: true } : i))
    );
    if (selectedIssue?.Issues_ID === id) {
      setSelectedIssue({ ...selectedIssue, IsFQA: true });
    }
  };
  return (
    <>
      <div>QuestionsPage</div>
      <Grid container spacing={4}>
        <Grid size={{ s: 12, md: 3 }}>
          <IssuesList onSelect={setSelectedIssue} />
        </Grid>
        <Grid size={{ s: 12, md: 9 }}>
          <IssueChat issue={selectedIssue} onMarkFAQ={handleMarkFAQ} />
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionsPage;
