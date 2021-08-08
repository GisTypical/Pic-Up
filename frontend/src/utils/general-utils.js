/**
 * Function that parses the date into LocaleString
 * @param {Date} date
 * @returns parsed date
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

/**
 * Takes all the images, filter them based on the search
 * and orders them by date.
 * @param {Array.<Object>} data picture data
 * @param {String} search
 * @returns sorted pictures
 */
export const processPictures = (data, search = "") => {
  let pics = data.pictures.filter((pic) => {
    // return all images if there's no search
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
 * Function that takes an array of tags (String), orders them
 * and returns an array of one tag and the number of tags left.
 * For the pictures card.
 * @param {Array.<String>} tags
 * @returns sorted pictures
 */
export const processTags = (tags) => {
  let proc_tags = [tags[0]];
  if (tags.length > 1) {
    proc_tags.push(`+${tags.length - 1}`);
  }
  return proc_tags;
};
