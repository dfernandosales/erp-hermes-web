import moment from "moment";

const removeAscDesc = text =>
  text
    .replace("asc", "")
    .replace("desc", "")
    .trim();
const ascDescNumber = (text = "asc") => (text.includes("desc") ? -1 : 1);
export const paginate = {
  limit: value => ["$limit", value],
  skip: value => ["$skip", value],
  sort: value => [`$sort[${value}]`, ascDescNumber(value)],
  order: value => [`$sort[${removeAscDesc(value)}]`, ascDescNumber(value)],
};

export const query = {
  like: field => value => [`${field}[$like]`, `%${value}%`],
  ilike: field => value => [`${field}[$iLike]`, `%${value}%`],
  startsWith: field => value => [`${field}[$iLike]`, `${value}%`],
  inDay: field => value => [
    [
      `${field}[$gte]`,
      moment(value)
        .startOf("day")
        .format(),
    ],
    [
      `${field}[$lte]`,
      moment(value)
        .endOf("day")
        .format(),
    ],
  ],
};

export const softDeleteStrategy = {
  remove: () => ({ deletedAt: new Date().toISOString() }),
  undoRemove: () => ({ deletedAt: null }),
  fetchList: () => ({}),
};

export const include = {
  include: values => {
    return values.map(value => {
      return [`$include[${value}]`, 1];
    });
  },
};
