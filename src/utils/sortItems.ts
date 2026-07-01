export const sortByDate = <T extends { createdAt: string }>(
  items: T[],
  order: "desc" | "asc" = "desc",
) => {
  return items.sort((a, b) => {
    const diff =
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return order === "desc" ? diff : -diff;
  });
};

export const sortByName = <T extends { name: string }>(
  items: T[],
  order: "desc" | "asc" = "asc",
  locale: string = "fa",
) => {
  return items.sort((a, b) => {
    const diff = a.name.localeCompare(b.name, locale);
    return order === "asc" ? diff : -diff;
  });
};
