// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// import { Student } from "../../../interfaces/Student";
// import { getStudentName } from "../../../utils/getStudentName";

// interface PaymentDialogProps {
//   open: boolean;
//   student: Student | null;
//   onClose: () => void;
// }

// export const PaymentDialog = ({
//   open,
//   student,
//   onClose,
// }: PaymentDialogProps) => {

//   const handleSave = () => {
//     console.log("Payment saved");
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>إضافة دفعة للطالب {getStudentName(student)}</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="المبلغ"
//           type="number"
//           fullWidth
//           variant="standard"
//         />
//         <TextField
//           margin="dense"
//           label="تاريخ الدفعة"
//           type="date"
//           fullWidth
//           variant="standard"
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           margin="dense"
//           label="ملاحظات"
//           fullWidth
//           variant="standard"
//           multiline
//           rows={3}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>إلغاء</Button>
//         <Button onClick={handleSave}>حفظ</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
