const moveNumberToEnd = (str1, str2, number) => {
  let arr1 = str1.split(",");
  let arr2 = str2.split(",");
  let index = arr1.indexOf(number.toString());
  let newStr2;
  if (index !== -1) {
    arr1.splice(index, 1);
    if (arr2.length === 1 && arr2[0] === "") {
      arr2[0] = number.toString();
    } else {
      arr2.push(number.toString().trim());
    }
  } else {
    return {
      error: "Member not found in list",
    };
  }
  let newStr1 = arr1.join(",");
  newStr2 = arr2.join(",");
  return [newStr1, newStr2];
};

module.exports = { moveNumberToEnd };
