import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
  date?: Date | null;
  time?: string | null;
  onDateChange?: (d: Date | null) => void;
  onTimeChange?: (t: string | null) => void;
  disabledDate?: (date: Date) => boolean;
  className?: string;
  hideTime?: boolean;
};

export function DateTimePicker({
  date = null,
  time = null,
  onDateChange,
  onTimeChange,
  disabledDate,
  className,
  hideTime = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [localDate, setLocalDate] = React.useState<Date | null>(date);
  const [localTime, setLocalTime] = React.useState<string | null>(time ?? '');

  React.useEffect(() => setLocalDate(date ?? null), [date]);
  React.useEffect(() => setLocalTime(time ?? ''), [time]);

  const handleDateSelect = (d: Date | undefined | null) => {
    const value = d ?? null;
    setLocalDate(value);
    onDateChange?.(value);
    setOpen(false);
  };

  const handleTimeChange = (v: string) => {
    if (hideTime) return;
    const value = v || null;
    setLocalTime(v);
    onTimeChange?.(value);
  };

  return (
    <div className={className}>
      <div className="flex gap-4 items-end">
        <div className="flex flex-col gap-2">
          {hideTime ? '' : <Label className="px-1">Date</Label>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-44 justify-between">
                {localDate ? localDate.toLocaleDateString() : 'Select date'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={localDate ?? undefined}
                onSelect={(d) => handleDateSelect(d ?? null)}
                disabled={disabledDate}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>

        {!hideTime && (
          <div className="flex flex-col gap-2">
            <Label className="px-1">Time</Label>
            <Input
              type="time"
              value={localTime ?? ''}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DateTimePicker;
