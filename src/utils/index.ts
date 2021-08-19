import { Context } from '../context'

export const isTaxiUnique = async (
  context: Context,
  bodyNumber: string,
): Promise<Boolean> => {
  const taxi = await context.prisma.taxi.findFirst({
    where: {
      bodyNumber: {
        equals: bodyNumber,
      },
    },
  })

  return !taxi ? true : false
}

export const isTaxiScheduled = async (
  context: Context,
  taxiId: string,
): Promise<Boolean> => {
  const scheduled = await context.prisma.taxiDriverMap.findFirst({
    where: {
      AND: [
        {
          taxiId: {
            equals: taxiId,
          },
          endAt: null,
        },
      ],
    },
  })

  return scheduled ? true : false
}

export const isDriverScheduled = async (
  context: Context,
  driverId: string,
): Promise<Boolean> => {
  const scheduled = await context.prisma.taxiDriverMap.findFirst({
    where: {
      AND: [
        {
          driverId: {
            equals: driverId,
          },
          endAt: null,
        },
      ],
    },
  })

  return scheduled ? true : false
}
