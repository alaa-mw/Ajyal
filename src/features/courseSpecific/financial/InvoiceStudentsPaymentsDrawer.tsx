// import React, { useState } from "react";
// import {
//   Drawer,
//   Box,
//   Typography,
//   Tabs,
//   Tab,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
//   Stack,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import { InvoiceStudentPayments } from "../../../interfaces/Invoice";
// import PaidIcon from "@mui/icons-material/Paid";
// import useFetchDataId from "../../../hooks/useFetchDataId";
// import { Student } from "../../../interfaces/Student";

// // Helper component for Tab Panels (a standard MUI pattern)
// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`student-payment-tabpanel-${index}`}
//       aria-labelledby={`student-payment-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ pt: 2, height: "calc(80vh - 120px)", overflowY: "auto" }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// // Simplified and reusable StudentList component
// interface StudentListProps {
//   students: Student[] | undefined;
//   bgColor: string;
// }

// const StudentList = ({ students, bgColor }: StudentListProps) => {
//   if (!students) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (students.length === 0) {
//     return (
//       <Typography sx={{ textAlign: "center", p: 4, color: "text.secondary" }}>
//         لا يوجد طلاب في هذه القائمة
//       </Typography>
//     );
//   }

//   return (
//     <List disablePadding>
//       {students.map((student) => (
//         <ListItem
//           key={student.id}
//           sx={{
//             bgcolor: bgColor,
//             borderRadius: 2,
//             mb: 1,
//           }}
//         >
//           <ListItemText
//             primary={`${student.first_name} ${student.last_name}`}
//             primaryTypographyProps={{ fontWeight: "bold", fontSize: "0.9rem" }}
//           />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// // Main Drawer Component
// interface Props {
//   invoiceId: string| undefined;
//   open: boolean;
//   onClose: () => void;
// }

// const InvoiceStudentsPaymentsDrawer = ({ invoiceId, open, onClose }: Props) => {
//   const [tabValue, setTabValue] = useState(0);

//   const { data: studentPayments, isLoading } =
//     useFetchDataId<InvoiceStudentPayments>(
//       `/payment/invoices/${invoiceId}/students/payments`,
//       invoiceId as string | undefined
//     );

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleSendFinancialAlert = () => {
//     // Implement your alert logic here
//     // make list store ids ,
//     console.log("Sending financial alert to unpaid students...");
//   };

//   const paidStudents = studentPayments?.data?.paid_students;
//   const unpaidStudents = studentPayments?.data?.unpaid_students;

//   return (
//     <Drawer
//       anchor="bottom"
//       open={open}
//       onClose={onClose}
//       sx={{
//         "& .MuiDrawer-paper": {
//           height: "80vh",
//           maxHeight: "700px", // Max height for larger screens
//           width: { xs: "100%", sm: 400 }, // Responsive width
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//           mx: "auto", // Center on larger screens
//           display: "flex",
//           flexDirection: "column",
//         },
//       }}
//     >
//       {/* Grabber Handle for UX */}
//       <Box
//         sx={{
//           width: 40,
//           height: 5,
//           bgcolor: "grey.300",
//           borderRadius: 3,
//           mx: "auto",
//           mt: 1.5,
//           mb: 1,
//         }}
//       />

//       <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           variant="fullWidth"
//           aria-label="student payment tabs"
//         >
//           <Tab
//             label={`المدفوعات (${
//               isLoading ? "..." : paidStudents?.length || 0
//             })`}
//             id="student-payment-tab-0"
//           />
//           <Tab
//             label={`المتبقي (${
//               isLoading ? "..." : unpaidStudents?.length || 0
//             })`}
//             id="student-payment-tab-1"
//           />
//         </Tabs>
//       </Box>

//       <Box sx={{ flexGrow: 1, overflow: "hidden", px: 2 }}>
//         <TabPanel value={tabValue} index={0}>
//           <StudentList students={paidStudents} bgColor="#e8f5e9" />
//         </TabPanel>

//         <TabPanel value={tabValue} index={1}>
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={1}
//           >
//             <Typography variant="body2" color="text.secondary">
//               الطلاب الذين لم يدفعوا بعد
//             </Typography>
//             <Tooltip title="ارسال تنبيه مالي للجميع">
//               <IconButton
//                 onClick={handleSendFinancialAlert}
//                 color="primary"
//                 size="small"
//               >
//                 <PaidIcon />
//               </IconButton>
//             </Tooltip>
//           </Stack>
//           <StudentList students={unpaidStudents} bgColor="#ffebee" />
//         </TabPanel>
//       </Box>
//     </Drawer>
//   );
// };

// export default InvoiceStudentsPaymentsDrawer;
import React, { useState, useEffect } from "react";
import useFetchData from "../../../hooks/useFetchData";
import {
  Drawer,
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Stack,
  Tooltip,
  IconButton,
  Checkbox,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { InvoiceStudentPayments } from "../../../interfaces/Invoice";
import PaidIcon from "@mui/icons-material/Paid";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import useSendData from "../../../hooks/useSendData";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { Student } from "../../../interfaces/Student";

// Helper component for Tab Panels (no changes)
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-payment-tabpanel-${index}`}
      aria-labelledby={`student-payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2, height: "calc(80vh - 120px)", overflowY: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Updated StudentList component to handle checkboxes
interface StudentListProps {
  students: Student[] | undefined;
  bgColor: string;
  // Optional props for checkbox functionality
  checkedIds?: string[];
  onToggle?: (studentId: string) => void;
}

const StudentList = ({
  students,
  bgColor,
  checkedIds,
  onToggle,
}: StudentListProps) => {
  if (!students) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (students.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", p: 4, color: "text.secondary" }}>
        لا يوجد طلاب في هذه القائمة
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {students.map((student) => {
        const labelId = `checkbox-list-label-${student.id}`;
        return (
          <ListItem
            key={student.id}
            disablePadding
            sx={{ bgcolor: bgColor, borderRadius: 2, mb: 1 }}
          >
            <ListItemButton
              role={undefined}
              onClick={onToggle ? () => onToggle(student.id) : undefined}
              dense
              sx={{ borderRadius: 2 }}
            >
              {onToggle && checkedIds && (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    icon={<RadioButtonUnchecked color="disabled" />}
                    checkedIcon={<CheckCircle color="primary" />}
                    checked={checkedIds.includes(student.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
              )}
              <ListItemText
                id={labelId}
                primary={`${student.first_name} ${student.last_name}`}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

// Main Drawer Component
interface Props {
  invoiceId: string;
  open: boolean;
  onClose: () => void;
}

const InvoiceStudentsPaymentsDrawer = ({ invoiceId, open, onClose }: Props) => {
  const { showSnackbar } = useSnackbar();
  const [tabValue, setTabValue] = useState(0);
  const [checkedStudentIds, setCheckedStudentIds] = useState<string[]>([]);

  const { data: studentPayments, isLoading } =
    useFetchData<InvoiceStudentPayments>(
      `/payment/invoices/${invoiceId}/students/payments`
    );

  const { mutate: notify } = useSendData("/invoice/notify-students");

  const paidStudents = studentPayments?.data?.paid_students;
  const unpaidStudents = studentPayments?.data?.unpaid_students;

  // Effect to set all unpaid students to checked by default when data loads
  useEffect(() => {
    if (unpaidStudents && unpaidStudents.length > 0) {
      setCheckedStudentIds(unpaidStudents.map((student) => student.id));
    }
    // Clear checks if the component is closed or data changes
    if (!open || !unpaidStudents) {
      setCheckedStudentIds([]);
    }
  }, [unpaidStudents, open]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSendFinancialAlert = () => {
    // Now you have the list of selected student IDs to work with
    console.log(
      "Sending financial alert to selected students:",
      checkedStudentIds
    );
    notify(
      {
        student_ids: checkedStudentIds,
        invoice_id: invoiceId,
      },
      {
        onSuccess: (response) => showSnackbar(response.message, "success"),
        onError: (error) => showSnackbar(error.message, "error"),
      }
    );
    // TODO: Implement your API call here using the `checkedStudentIds`
  };

  const handleToggleStudentCheck = (studentId: string) => {
    const currentIndex = checkedStudentIds.indexOf(studentId);
    const newChecked = [...checkedStudentIds];

    if (currentIndex === -1) {
      newChecked.push(studentId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedStudentIds(newChecked);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && unpaidStudents) {
      const allUnpaidIds = unpaidStudents.map((s) => s.id);
      setCheckedStudentIds(allUnpaidIds);
      return;
    }
    setCheckedStudentIds([]);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          height: "80vh",
          maxHeight: "700px",
          width: { xs: "100%", sm: 400 },
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 5,
          bgcolor: "grey.300",
          borderRadius: 3,
          mx: "auto",
          mt: 1.5,
          mb: 1,
        }}
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="student payment tabs"
        >
          <Tab
            label={`المدفوعات (${
              isLoading ? "..." : paidStudents?.length || 0
            })`}
          />
          <Tab
            label={`المتبقي (${
              isLoading ? "..." : unpaidStudents?.length || 0
            })`}
          />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 2 }}>
        <TabPanel value={tabValue} index={0}>
          {/* The "Paid" list works as before, without checkboxes */}
          <StudentList students={paidStudents} bgColor="#e8f5e9" />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="body2" color="text.secondary">
            الطلاب الذين لم يدفعوا بعد
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
            px={1}
          >
            <Stack direction="row" alignItems="center">
              <Checkbox
                icon={<RadioButtonUnchecked color="disabled" />}
                checkedIcon={<CheckCircle color="primary" />}
                color="primary"
                indeterminate={
                  unpaidStudents
                    ? checkedStudentIds.length > 0 &&
                      checkedStudentIds.length < unpaidStudents.length
                    : false
                }
                checked={
                  unpaidStudents
                    ? unpaidStudents.length > 0 &&
                      checkedStudentIds.length === unpaidStudents.length
                    : false
                }
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all unpaid students" }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: -1 }}
              >
                تحديد الكل
              </Typography>
            </Stack>

            <Tooltip title="ارسال تنبيه مالي ">
              <span>
                {" "}
                {/* Span is needed to show tooltip on a disabled button */}
                <IconButton
                  onClick={handleSendFinancialAlert}
                  color="primary"
                  size="small"
                  disabled={checkedStudentIds.length === 0}
                >
                  <PaidIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
          {/* The "Unpaid" list now gets the props for checkbox functionality */}
          <StudentList
            students={unpaidStudents}
            bgColor="#ffebee"
            checkedIds={checkedStudentIds}
            onToggle={handleToggleStudentCheck}
          />
        </TabPanel>
      </Box>
    </Drawer>
  );
};

export default InvoiceStudentsPaymentsDrawer;
