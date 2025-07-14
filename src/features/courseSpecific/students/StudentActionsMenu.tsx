import { Menu, MenuItem } from "@mui/material";
import { Notifications, Payment, Visibility, NoteAdd } from "@mui/icons-material";

interface StudentActionsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSendPaymentAlert: () => void;
  onAddPayment: () => void;
  onViewPayments: () => void;
  onAddNote: () => void;
}

export const StudentActionsMenu = ({
  anchorEl,
  onClose,
  onSendPaymentAlert,
  onAddPayment,
  onViewPayments,
  onAddNote,
}: StudentActionsMenuProps) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
    <MenuItem onClick={onSendPaymentAlert}>
      <Notifications fontSize="small" sx={{ ml: 1 }} />
      إرسال تنبيه مالي
    </MenuItem>
    <MenuItem onClick={onAddPayment}>
      <Payment fontSize="small" sx={{ ml: 1 }} />
      إضافة دفعة
    </MenuItem>
    <MenuItem onClick={onViewPayments}>
      <Visibility fontSize="small" sx={{ ml: 1 }} />
      عرض الدفعات
    </MenuItem>
    <MenuItem onClick={onAddNote}>
      <NoteAdd fontSize="small" sx={{ ml: 1 }} />
      إضافة ملاحظة
    </MenuItem>
  </Menu>
);