export const listToRecord = <T extends { id: string }>(list: T[]) =>
  list.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as Record<string, T>
  );
