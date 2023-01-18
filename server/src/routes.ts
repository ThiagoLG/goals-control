import dayjs from "dayjs";
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {

  // endpoint to create new habit
  app.post('/habits', async (request, response) => {
    /**
     * /habits/1 => request.params
     * qhabits?id=1 => request.query
     * only /habits and send body to req => request.body 
     */

    // create expected body format to receive
    const creaateHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    // get body value, validatind against zod object definition
    const { title, weekDays } = creaateHabitBody.parse(request.body);

    // get today at zero hour
    const today = dayjs().startOf('day').toDate();

    // input item on db
    const habit = await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(wd => ({ week_day: wd }))
        }
      }
    })

    return habit
  });

  // list all days
  app.get('/day', async (request) => {

    // set expected structure of body
    const getDayParams = z.object({
      date: z.coerce.date() // convert date to string
    })

    // get date from querystring and after get the weekday (number)
    const { date } = getDayParams.parse(request.query);
    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day');

    //find all habits that has been created before the specified date and match the weekday
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    });

    // get all habits completed at specified date
    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabit: true,
      }
    });

    // find for all completed habits at the date and return it id's
    const completedHabits = day?.dayHabit.map(dayHabit => dayHabit.habit_id);

    return {
      possibleHabits,
      completedHabits
    }
  });


}