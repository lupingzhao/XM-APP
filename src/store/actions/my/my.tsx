import api from "../../../http/api";
import Taro from "@tarojs/taro";

export const register = (mobile: string, code: string, username: string, password: string) => {
  return (dispatch: any) => {
    // 发请求
    api.register({
      mobile: mobile,
      code: code,
      username: username,
      password: password
    }).then((res: any) => {

      // 触发reducer的方法
      Taro.showToast({
        title: res.msg
      })
      if (res.code == 200) {
        dispatch({
          type: 'register',
          data: true
        })
      }
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getCode = (mobile: string) => {
  return (dispatch: any) => {
    // 发请求
    api.getCode({
      mobile: mobile
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.showToast({
          title: res.msg
        })
        // 触发reducer的方法
        dispatch({
          type: 'getCode',
          data: res.data
        })
      }
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const mobileLogin = (mobile: string, code: string) => {
  return (dispatch: any) => {
    // 发请求
    api.mobileLogin({
      mobile: mobile,
      code: code
    }).then((res: any) => {
      // 触发reducer的方法
      if (res.code === 200) {
        Taro.setStorageSync('token', res.token)
        Taro.setStorageSync('user', res.data)
        dispatch({
          type: 'mobileLogin',
          data: res.data
        })
        Taro.navigateBack()
      } else {
        Taro.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const userLogin = (username: string, password: string) => {
  return (dispatch: any) => {
    // 发请求
    api.userLogin({
      username: username,
      password: password
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.setStorageSync('token', res.token)
        Taro.setStorageSync('user', res.data)
        dispatch({
          type: 'mobileLogin',
          data: res.data
        })
        Taro.navigateBack()
      } else {
        Taro.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }

    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getAreaList = () => {
  return (dispatch: any) => {
    api.getAreaList().then((res: any) => {
      if (res.code === 200) {
        res.data.map((t: any) => {
          t.title = t.py_head,
            t.key = t.py_head,
            t.items = t.name_list
        })
        dispatch({
          type: 'getAreaList',
          data: res.data
        })
      }
    })

  }
}
export const searchAreaList = (content: string) => {
  return (dispatch: any) => {
    api.searchAreaList(content).then((res: any) => {
      if (res.code === 200) {
        dispatch({
          type: 'searchAreaList',
          data: res.data.data.area_list
        })
      }
    })
  }
}
export const getStoreHome = (name: string, id: string) => {
  return (dispatch: any) => {
    api.getStoreHome({
      // 地区名字
      area_name: name,
      // 地区id
      area_id: id
    }).then((res: any) => {
      if (res.code === 200) {
        dispatch({
          type: 'getStoreHome',
          data: res.data.data.store_type_list
        })
      }

    })
  }
}
export const getStoreDetail = (id: string) => {
  return (dispatch: any) => {
    api.getStoreDetail(
      id
    ).then((res: any) => {
      if (res.code === 200) {
        dispatch({
          type: 'getStoreDetail',
          data: res.data
        })
      }
    })
  }
}