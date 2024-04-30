import { camelCaseToTitleCase } from '@/utils/strings';

/* eslint-disable no-nested-ternary */
export enum Progress {
  IN_PROGRESS = 'inProgress',
  NEEDS_SYNC = 'needsSync',
  WAITING_REVIEW = 'inReview',
  NEEDS_CORRECTION = 'needsCorrection',
  COMPLETE = 'completed',
  UNKNOWN = 'unknown',
}
export const ProgressBubbles = (props: { type: string; className?: any }) => {
  const colorMap = {
    [Progress.IN_PROGRESS]: 'bg-[#FFFCD3]',
    [Progress.NEEDS_SYNC]: 'bg-[#FFE0E0]',
    [Progress.WAITING_REVIEW]: 'bg-[#E9F7FF]',
    [Progress.NEEDS_CORRECTION]: 'bg-[#F0E6FF]',
    [Progress.COMPLETE]: 'bg-[#E6F9E5]',
    [Progress.UNKNOWN]: 'bg-[#E6E6E6]',
  };

  const color = colorMap[props.type as Progress] || '';

  return (
    <div className={props.className}>
      <div
        className={`inline-flex h-8 items-center rounded-md p-2 text-sm ${color} whitespace-nowrap text-black print:h-8 print:py-0`}
      >
        {camelCaseToTitleCase(props.type)}
      </div>
    </div>
  );
};
