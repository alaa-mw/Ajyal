import React from "react";
import { Box  } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import theme from "../../styles/mainThem";
import SubjectCard from "../subjects/subjectCard";

const CurriculumList = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
      <TabContext value={value}>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiTab-root": {
                color: "#fff", // White text for all tabs
                width: "70%",
                transition: "all 0.3s ease",
                mr:2
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
            <Tab label="المنهاج المدرس" value="1" />
          </Tabs>
        </Box>
        <TabPanel value="1" sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {[...Array(8)].map((_,index) => (
              <SubjectCard index={index}/>
            ))}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CurriculumList;
