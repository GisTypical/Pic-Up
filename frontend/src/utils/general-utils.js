/**
 * Función que retorna la fecha en string local
 * @param {String} date
 * @returns Parsed date
 */
export const getDate = (date) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString();
};

export const sortByTime = (repos) => {
  return repos.sort((a, b) => {
    return new Date(b.last_mod) - new Date(a.last_mod);
  });
};

/** Obtiene las imágenes, las filtra según la búsqueda del usuario
 * y las ordena (últimas fotos primero)
 */
export const processPictures = (data, search = "") => {
  let pics = data.pictures.filter((pic) => {
    // Si no hay nada que retorne todo
    if (!search) {
      return true;
    }
    return pic.tags.includes(search.toLowerCase());
  });

  return pics.sort(
    (a, b) => new Date(b.uploaded_date) - new Date(a.uploaded_date)
  );
};

/**
 * Funcion que toma un array de tags, los ordena y devuelve
 * un array con solo un tag y el número de tags restantes.
 * Esto es más que todo para no saturar la card de tags
 */
export const processTags = (tags, search) => {
  let proc_tags = [tags[0]];
  if (tags.length > 1) {
    proc_tags.push(`+${tags.length - 1}`);
  }
  return proc_tags;
};
