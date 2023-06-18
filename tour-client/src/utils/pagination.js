const createArrayByGivenRange = (start, end) => {
  let array = [];

  for (let i = start; i < end; i++) {
    array.push(i);
  }

  return array;
};

export const returnPaginationRange = (totalPage, page, siblings) => {
  let totalPageNoInArray = 7 + siblings;

  if (totalPageNoInArray >= totalPage) {
    return createArrayByGivenRange(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = createArrayByGivenRange(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = createArrayByGivenRange(
      totalPage - rightItemsCount + 1,
      totalPage + 1
    );
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = createArrayByGivenRange(
      leftSiblingsIndex,
      rightSiblingsIndex + 1
    );
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
};
