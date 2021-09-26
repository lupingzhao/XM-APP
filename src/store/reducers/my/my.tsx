import Taro from '@tarojs/taro';

const initState = {
  user: Taro.getStorageSync('user'),
  isrefis: false,
  city: '',
  seachcity: '',
  homed: '',
  shop: ''
}

interface Action {
  type: string,
  data: any,
}

const myReducers = (state = initState, action: Action) => {
  if (action.type === 'register') {
    return {
      ...state,
      isrefis: action.data,
    }
  }
  else if (action.type === 'mobileLogin') {
    return {
      ...state,
      user: action.data,
    }
  }
  else if (action.type === 'userLogin') {
    return {
      ...state,
      user: action.data,
    }
  }
  else if (action.type === 'getAreaList') {

    return {
      ...state,
      city: action.data,
    }
  }
  else if (action.type === 'searchAreaList') {
    return {
      ...state,
      seachcity: action.data,
    }
  }
  else if (action.type === 'getStoreDetail') {
    return {
      ...state,
      homed: action.data,
    }
  }
  else if (action.type === 'getStoreHome') {
    return {
      ...state,
      shop: action.data,
    }
  }
  else {
    return { ...state }
  }
}

export default myReducers