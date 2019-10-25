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


/**
 * 页面滚动器
 */
export class ScreenScroller {
  constructor() {
    this.timmer = null
  }
  /**
   * 触发页面滚动动画
   * @param {Element} el 滚动元素
   * @param {Number} time 滚动时长（ms）
   * @param {Number} start 滚动开始位置
   * @param {Number} target 滚动结束位置
   */
  scroll(el, time, start, target) {
    if (this.timmer) {
      clearInterval(this.timmer)
    }
    // 滚动的距离
    let x = Math.abs(start - target)
    // 滚动的方向，1 为向下滚动， -1 为向上滚动
    let dir = Math.sign(target - start)

    // 计算滚动速度（单位毫秒）
    let speed = x / (time / 4)
    let scroll_last = speed - 1

    this.timmer = setInterval(() => {
      let current = el.scrollTop
      // 防止滚动目标达不到屏幕顶端而卡住
      if (scroll_last === current) {
        clearInterval(this.timmer);
        return;
      } else {
        scroll_last = current;
      }

      // 滚动页面
      el.scrollTop += speed * dir

      // 判断滚动是否停止
      switch (dir) {
        case -1:
          if (current - speed < target) {
            clearInterval(this.timmer)
            el.scrollTop = target
          }
          break
        case 1:
          if (current + speed > target) {
            clearInterval(this.timmer)
            el.scrollTop = target
          }
          break
        case 0:
          clearInterval(this.timmer)
          el.scrollTop = target
          break
      }
    }, 1);
  }
}