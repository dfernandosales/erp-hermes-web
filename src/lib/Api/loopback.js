export const loopbackFilters = {
  regexp: value => ({ regexp: `/${value}/i` }),
  ilike: value => ({ ilike: `%${value.split("").join("%")}%` }),
  ilikeWithoutSplit: value => ({ ilike: `%${value}%` })
};
