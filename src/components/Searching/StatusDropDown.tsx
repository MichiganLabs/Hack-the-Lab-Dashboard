import { Progress, ProgressBubbles } from '../ProgressBubbles/ProgressBubbles';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface StatusDropDownProps {
  setStatus: (status: string) => void;
}
export const StatusDropDown = (props: StatusDropDownProps) => {
  return (
    <Select
      onValueChange={(field: any) => {
        props.setStatus(field);
      }}
      defaultValue="any"
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="User Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem disabled value="default">
            Filter by Status
          </SelectItem>
          <SelectItem className="ml-1" value="any">
            Status
          </SelectItem>
          <SelectItem value={Progress.IN_PROGRESS}>
            <ProgressBubbles type={Progress.IN_PROGRESS} />
          </SelectItem>
          <SelectItem value={Progress.NEEDS_SYNC}>
            <ProgressBubbles type={Progress.NEEDS_SYNC} />
          </SelectItem>
          <SelectItem value={Progress.WAITING_REVIEW}>
            <ProgressBubbles type={Progress.WAITING_REVIEW} />
          </SelectItem>
          <SelectItem value={Progress.NEEDS_CORRECTION}>
            <ProgressBubbles type={Progress.NEEDS_CORRECTION} />
          </SelectItem>
          <SelectItem value={Progress.COMPLETE}>
            <ProgressBubbles type={Progress.COMPLETE} />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
