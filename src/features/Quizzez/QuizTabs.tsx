import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import QuizList from "./QuizList";
import theme from "../../styles/mainThem";

const QuizTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          // height: "600px",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              sx={{
                "& .MuiTab-root": {
                  color: "#fff", // White text for all tabs
                  width: "50%",

                  transition: "all 0.3s ease",
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
              <Tab label="الاختبارات القادمة" value="1" />
              <Tab label="الاختبارات المنجزة" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1" sx={{ py: 2 }}>
            <QuizList />
          </TabPanel>
          <TabPanel value="2" sx={{ py: 2 }}>
            <QuizList />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default QuizTabs;
