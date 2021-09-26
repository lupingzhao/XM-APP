import api from "../../../http/api";

export const getSearchWords = () => {
  return (dispatch: any) => {
    // 发请求
    api.getSearchWords().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getSearchWords',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getRecommend = () => {
  return (dispatch: any) => {
    // 发请求
    api.getRecommend().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getRecommend',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const goodsDetail = (id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.goodsDetail(id).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'goodsDetail',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const search = (
  current: number,
  pageSize: number,
  query: string,
  more = false
) => {
  return (dispatch: any) => {
    // 发请求
    api.search({ current: current, pageSize: pageSize, query: query }).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'search',
        data: res.data,
        total: res.total,
        more
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}