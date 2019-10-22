/**
 * 合并字符串中重复的字符
 * @param {String} str 完整字符串
 * @param {String} char 需要合并的字符
 */
export function mergString(str, char) {
  let strArr = str.split(char)
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === "" && i != strArr.length - 1) {
      strArr.splice(i, 1)
      i--
    }
  }
  return strArr.join(char)
}
