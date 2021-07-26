export const getDate = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString();
};

export const sortReposByTime = (repos) => {
  return repos.sort((a, b) => {
    return new Date(b.last_mod) - new Date(a.last_mod);
  });
};

/**
 * Funcion que toma un array de tags, los ordena y devuelve
 * un array con solo un tag y el número de tags restantes.
 * Esto es más que todo para no saturar la card de tags
 */
export const processTags = (tags) => {
  let proc_tags = [tags[0]];
  if (tags.length > 1) {
    proc_tags.push(`+${tags.length - 1}`);
  }
  return proc_tags;
};
