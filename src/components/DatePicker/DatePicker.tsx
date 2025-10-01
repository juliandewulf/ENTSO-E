import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { format, parseISO, isValid } from 'date-fns';
import { DateString } from '@/types';

interface DatePickerProps {
  selectedDate: DateString;
  onDateChange: (date: DateString) => void;
  disabled?: boolean;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  disabled = false,
  label = 'Select Date',
  maxDate = new Date(), // Default to today
  minDate,
}) => {
  const parseDate = (dateString: DateString): Date | null => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? date : null;
    } catch {
      return null;
    }
  };

  const formatDate = (date: Date | null): DateString => {
    if (!date || !isValid(date)) {
      return format(new Date(), 'yyyyMMdd');
    }
    return format(date, 'yyyyMMdd');
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate && isValid(newDate)) {
      const formattedDate = formatDate(newDate);
      onDateChange(formattedDate);
    }
  };

  const currentDate = parseDate(selectedDate);

  return (
    <MuiDatePicker
      label={label}
      value={currentDate}
      onChange={handleDateChange}
      disabled={disabled}
      maxDate={maxDate}
      minDate={minDate}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          'data-testid': 'date-picker',
        } as any,
      }}
    />
  );
};

export default DatePicker;
