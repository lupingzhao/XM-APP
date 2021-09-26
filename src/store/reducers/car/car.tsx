import Taro from '@tarojs/taro';

const initState = {
  total: Taro.getStorageSync('total'),
  data: '',
  order: '',
  address: ''
}

interface Action {
  type: string,
  data: any,
  total: number
}

const carReducers = (state = initState, action: Action) => {
  if (action.type === 'getCart') {
    return {
      ...state,
      total: action.total,
      data: action.data
    }
  }
  if (action.type === 'getAppOrder') {
    return {
      ...state,
      order: action.data
    }
  }
  if (action.type === 'getAppAddress') {
    return {
      ...state,
      address: action.data
    }
  }

  else {
    return { ...state }
  }
}

export default carReducers