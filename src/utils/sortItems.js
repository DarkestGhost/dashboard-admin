export const sortByDate = (items, order = "desc") => {
  return items.sort((a, b) => {
    const diff = new Date(b.createdAt) - new Date(a.createdAt);
    return order === "desc" ? diff : -diff;
  });
}

export const sortByName = (items, order = "asc", locale = "fa") => {
  return items.sort((a, b) => {
    const diff = a.name.localeCompare(b.name, locale);
    return order === "asc" ? diff : -diff;
  });
};
