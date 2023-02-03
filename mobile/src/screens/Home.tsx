import { View, Text, ScrollView } from "react-native";

import { HabbitDay, DAY_SIZE } from "../components/HabbitDay";
import { Header } from "../components/Header";

import { generateDateFromYearBeginning } from "../utils/generate-date-from-year-beginning";

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateDateFromYearBeginning();
const minumumSummaryDateSizes = 18 * 5;
const amountOfDaysToFill = minumumSummaryDateSizes - datesFromYearStart.length;

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          WEEK_DAYS.map((day, i) => {
            return <Text
              key={`${day}-${i}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1 "
              style={{ width: DAY_SIZE }}
            >
              {day}
            </Text>
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => {
              return (
                <HabbitDay key={date.toISOString()} />
              )
            })
          }
          {

            amountOfDaysToFill > 0 &&
            Array
              .from({ length: amountOfDaysToFill })
              .map((_, index) => {
                return (
                  <View
                    key={index}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                )
              })
          }
        </View>

      </ScrollView>
    </View>
  )
}