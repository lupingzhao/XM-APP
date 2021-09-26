import api from "../../../http/api";

export const banner = () => {
  return (dispatch: any) => {
    // 发请求
    api.getBanner().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'banner',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getNav = () => {
  return (dispatch: any) => {
    // 发请求
    api.getNav().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getNav',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getGoods = () => {
  return (dispatch: any) => {
    // 发请求
    api.getGoods().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getGoods',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getNew = () => {
  return (dispatch: any) => {
    // 发请求
    api.getNew().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getNew',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getRecommendNav = () => {
  return (dispatch: any) => {
    // 发请求
    api.getRecommendNav().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getRecommendNav',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getNavGoods = (id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.getNavGoods(id).then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getNavGoods',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getNotice = () => {
  return (dispatch: any) => {
    // 发请求
    api.getNotice().then((res: any) => {
      // 触发reducer的方法
      dispatch({
        type: 'getNotice',
        data: res.data
      })
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}