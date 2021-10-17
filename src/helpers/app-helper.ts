export const AppHelper = {
  isObjectEmpty(source: Object) {
    if (Object.keys(source).length === 0) {
      return true;
    }
    return false;
  },
  getTotalCaseByStatus(src: Array<any>, property: string): number {
    let total = 0;
    let valueIndex = -1;
    for (let i = src.length - 1; i >= 0; i--) {
      if (src[i][property] > 0) {
        valueIndex = i;
        break;
      }
    }
    if (valueIndex > -1) {
      total = src[valueIndex][property];
    }

    return total;
  },
};
