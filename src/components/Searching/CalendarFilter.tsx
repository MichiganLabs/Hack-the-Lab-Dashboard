import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';

import { cn } from '@/libs/utils';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const pastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

interface CalendarFilterProps {
  value: string;
  setValue: (date: string) => void;
  title: string;
  range?: boolean;
}
export const CalendarFilter = (props: CalendarFilterProps) => {
  const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  if (props.range) {
    if (!range?.from && !range?.to) {
      props.setValue('');
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-34 justify-start text-left font-normal',
            !props.value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.value ? (
            <div className="flex w-full flex-row justify-between">
              {props.range ? (
                <span>
                  {range?.from ? format(range.from, 'MM/dd/yyyy') : 'From ?'}
                  {' - '} {range?.to ? format(range.to, 'MM/dd/yyyy') : 'To ?'}
                </span>
              ) : (
                <span>{format(new Date(props.value), 'MM/dd/yyyy')}</span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setValue('');
                }}
                aria-label="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <span>{props.title}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {props.range ? (
          <Calendar
            id="test"
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            onSelect={(date) => {
              setRange(date);
              const formatted = `${date?.from?.toISOString()},${date?.to?.toISOString()}`;
              console.log(formatted);
              props.setValue(formatted);
            }}
          />
        ) : (
          <Calendar
            mode="single"
            selected={new Date(props.value)}
            onSelect={(date) => date && props.setValue(date.toISOString())}
            captionLayout="dropdown-buttons"
            fromYear={1900}
            toYear={new Date().getFullYear()}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
