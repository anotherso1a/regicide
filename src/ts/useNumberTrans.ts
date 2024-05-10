import { ref } from "vue"

/**
 * 数字帧率变动器
 */
export function useNumberTrans(s = 0) {
  const display = ref(s)
  return {
    display,
    start: (start: number, end: number, duration = 300) => {
      console.log(start, end)
      const dx = end - start // 结果差
      let startStamp = 0
      let preStamp = 0
      display.value = start // 更新显示值
      let currentNum = start // 改变量记录总数，避免由于duration过大导致永远floor为start的情况
      const decrease = (stamp: number) => {
        if (!preStamp || !startStamp) { // 第一帧什么都不做，初始化一下
          preStamp = stamp
          startStamp = stamp
        } else if (stamp - startStamp >= duration) { // 优先判断终点时间
          display.value = end
        } else {
          const x = stamp - preStamp // 每一帧的差
          const d = x / duration // 每一帧在总数中所占比例
          const n = d * dx // 每一帧应该增长的数值，负数同理
          currentNum += n
          display.value = Math.floor(currentNum) // 改变显示值，取整
        }
        preStamp = stamp // 更新 preStamp
        requestAnimationFrame(decrease) // loop
      }
      decrease(0)
    }
  }
}