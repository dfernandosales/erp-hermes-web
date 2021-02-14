export const getListActions = (ability, listHook, name) => ({
  removeItem: ability.can("remove", name) ? listHook.removeItem : undefined,
  onClickEdit: ability.can("read", name) ? listHook.onClickEdit : undefined,
  onClickNew: ability.can("create", name) ? listHook.onClickNew : undefined,
});
