const initState = {
  searchData: [],
  hot: [],
  recgoods: [],
  total: -1,
  detail: ''
}

interface Action {
  type: string,
  data: any,
  total: number,
  more: boolean
}

const homeReducers = (state = initState, action: Action) => {
  if (action.type === 'search') {
    return {
      ...state,
      searchData: action.more ? [...state.searchData, ...action.data] : action.data,
      total: action.total
    }
  } else if (action.type === 'getSearchWords') {
    return {
      ...state,
      hot: action.data,
    }
  } else if (action.type === 'getRecommend') {
    return {
      ...state,
      recgoods: action.data,
    }
  }
  else if (action.type === 'goodsDetail') {
    return {
      ...state,
      detail: action.data,
    }
  }
  else {
    return { ...state }
  }
}

export default homeReducers