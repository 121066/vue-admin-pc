export function indexData(val) {
  val.forEach((item, index) => {
    item.index = index + 1 + "";
    if (item.children && item.children.length > 0) {
      _indexData(item, item.index);
    }
  });
  function _indexData(item, oldIndex) {
    if (item.children && item.children.length < 0) return;
    if (item.children && item.children.length > 0) {
      item.children.forEach((Item, i) => {
        Item.index = oldIndex + "." + (i + 1);
        _indexData(Item, Item.index);
      });
    }
  }
  return val;
}
