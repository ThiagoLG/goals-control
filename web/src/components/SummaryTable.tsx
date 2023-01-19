import { generateDateFromYearBeginning } from "../utils/generate-date-from-year-beginning";
import { HabbitDay } from "./HabbitDay";

export function SummaryTable() {

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const minimumSummaryDateSizes = 18 * 7 // 18 weeks
  const summaryDates = generateDateFromYearBeginning();
  const amountOfDaysToFill = minimumSummaryDateSizes - summaryDates.length; // gets the total number of days that left to reach mininum amount

  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">

        {/* Render day columns */}
        {weekDays.map((day, index) => {
          return (
            <div key={index} className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
              {day}
            </div>
          )
        })}

      </div>

      {/* Renderizes the squares of days until now in this year */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(hd => {
          return (
            <HabbitDay key={hd.toISOString()} />
          )
        })}

        {/* Creates rest of the habbitDays if didn't reacdh the minimum yet */}
        {
          !!amountOfDaysToFill
          && Array
            .from({ length: amountOfDaysToFill })
            .map((day, index) => {
              return (
                <HabbitDay key={index} disabled />
              )
            })
        }
      </div>

    </div>
  )
}