import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { arSA } from "date-fns/locale/ar-SA";
import { format } from "date-fns";
import { Dayjs } from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface RTLTimeDatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  label?: string;
  minDate?: Date | string | null;
  disabled?: boolean;
}

export function RTLTimeDatePicker({
  value,
  onChange,
  label,
  minDate,
  disabled = false
}: RTLTimeDatePickerProps) {
  const handleDateChange = (date: Date | Dayjs | null) => {
    if (date) {
      const d = new Date(date.toString());
      const formattedDate = format(d, "yyyy-MM-dd HH:mm:ss");
      onChange(formattedDate);
    }
  };
  const getMinDate = () => {
    if (!minDate) return undefined;
    return minDate instanceof Date ? minDate : new Date(minDate);
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={arSA}
      localeText={{
        datePickerToolbarTitle: "اختيار التاريخ",
        previousMonth: "الشهر السابق",
        nextMonth: "الشهر التالي",
        cancelButtonLabel: "إلغاء",
        okButtonLabel: "تأكيد",
        todayButtonLabel: "اليوم",
        openPreviousView: "فتح العرض السابق",
        openNextView: "فتح العرض التالي",
        clearButtonLabel: "مسح",
      }}
    >
      <DateTimePicker
        label={label}
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        minDate={getMinDate()}
        disabled={disabled}
        slotProps={{
          textField: {
            dir: "rtl",
          },
          actionBar: {
            actions: ["today"],
            sx: {
              flexDirection: "row-reverse",
            },
          },
        }}
        sx={{
          "& .MuiPickersInputBase-root": {
            // flexDirection: "row-reverse",
            "& .MuiInputAdornment-root": {
              marginLeft: 0,
              marginRight: "8px",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
