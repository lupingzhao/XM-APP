import api from "../../../http/api";
import Taro from "@tarojs/taro";
import dayjs from 'dayjs'

export const addCart = (count: number, goods: any, spec: string[]) => {
  return (dispatch: any) => {
    // 发请求
    api.addCart({
      // 用户id
      user_id: Taro.getStorageSync('user')._id,
      // 购物车数量
      count: count,
      // 商品
      goods: goods,
      // 商品规格
      spec: spec
    }).then((res: any) => {
      Taro.showToast({
        title: res.msg
      })
      // 调用其他的方法
      dispatch(getCart())
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const addOrder = (price: number, address: string, count: string,
  goods_list: any[], mobile: string) => {
  return (dispatch: any) => {
    // 发请求
    api.addOrder({
      // 用户id
      user_id: Taro.getStorageSync('user')._id,
      // 订单总价
      price: price,
      // 用户地址
      address: address,
      // 订单商品数量
      count: count,
      // 支付时间
      pay_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      // 商品列表
      goods_list: goods_list,
      // 用户电话
      mobile: mobile,
    }).then((res: any) => {
      // 触发reducer的方法
      if (res.code === 200) {
        Taro.showToast({
          title: res.msg,
          icon: 'none'
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

export const getCart = () => {
  return (dispatch: any) => {
    // 发请求
    api.getCart(Taro.getStorageSync('user')._id,
    ).then((res: any) => {
      if (res.code === 200) {
        Taro.setStorageSync('total', res.total)
        res.data.map((t) => {
          t.check = false
          t.selectedList = []
        })
        dispatch({
          type: 'getCart',
          data: res.data,
          total: res.total
        })
      }
    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const updateCart = (id: string, count: number) => {
  return (dispatch: any) => {
    // 发请求
    api.updateCart({
      // 商品id
      id: id,
      // 用户id
      user_id: Taro.getStorageSync('user')._id,
      // 商品数量
      count: count,
    }).then((res: any) => {

    }
    ).catch((err: any) => {
      console.log(err)
    })
  }
}
export const delCart = (id: string) => {
  return () => {
    // 发请求
    api.delCart({
      // 用户id
      user_id: Taro.getStorageSync('user')._id,
      // 商品id
      id: id
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
export const getAppOrder = () => {
  return (dispatch: any) => {
    // 发请求
    api.getAppOrder(Taro.getStorageSync('user')._id,
    ).then((res: any) => {
      if (res.code === 200) {
        dispatch({
          type: 'getAppOrder',
          data: res.data
        })
      }
    })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
export const getAppAddress = () => {
  return (dispatch: any) => {
    // 发请求
    api.getAppAddress(Taro.getStorageSync('user')._id,
    ).then((res: any) => {
      if (res.code === 200) {
        console.log(res.data)
        dispatch({
          type: 'getAppAddress',
          data: res.data
        })
      }
    })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
export const delAddress = (id: string) => {
  return (dispatch: any) => {
    // 发请求
    api.delAddress({
      // 地址id
      addressId: id,
      // 用户id
      user_id: Taro.getStorageSync('user')._id
    }).then((res: any) => {
      if (res.code === 200) {
        dispatch(getAppAddress())
      }
    })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
export const createComment = (gid: string, id: string, rate: number,
  content: string, pic: string[], isAnonymous: boolean) => {
  return () => {
    // 发请求
    api.createComment({
      // 用户id
      user_id: Taro.getStorageSync('user')._id,
      // 商品id
      goods_id: gid,
      // 订单id
      order_id: id,
      // 评分
      rate: rate,
      // 评价内容
      content: content,
      // 评论图片
      pic: pic,
      // 是否匿名
      isAnonymous: isAnonymous,
      // 评论时间
      comment_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.navigateBack()
      }
    })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
export const addAddress = (username: string, mobile: string, address: any,
  detailAddress: string, isDefault: boolean) => {
  return () => {
    // 发请求
    api.addAddress({
      // 用户id
      user_id: Taro.getStorageSync('user')._id,
      // 用户名
      username: username,
      // 用户电话
      mobile: mobile,
      // 用户省市区地址
      address: address,
      // 用户详细地址
      detailAddress: detailAddress,
      // 是否是默认地址
      isDefault: isDefault,
    }).then((res: any) => {
      if (res.code === 200) {
        Taro.navigateTo({
          url: '/pages/address/address'
        })
      }
    })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
