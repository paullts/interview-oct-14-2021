export const AppHelper = {
  isObjectEmpty(source: Object) {
    if (Object.keys(source).length === 0) {
      return true;
    }
    return false;
  },
};
