export const getDate = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString();
};

export const sortReposByTime = (repos) => {
  return repos.sort((a, b) => {
    return new Date(b.last_mod) - new Date(a.last_mod);
  });
};
