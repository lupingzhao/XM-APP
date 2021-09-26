import api from "../../../http/api";

export const getCategory = () => {
  return (dispatch: any) => {
    // 发请求
    api.getCategory().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getCategory',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}