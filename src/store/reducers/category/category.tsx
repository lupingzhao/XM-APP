const initState = {
  cate: [],
  goods: [],
}

interface Action {
  type: string,
  data: any,
}


const cateReducers = (state = initState, action: Action) => {
  if (action.type === 'getCategory') {
    return {
      ...state,
      cate: action.data,
    }
  } else if (action.type === 'getNav') {
    return {
      ...state,
      nav: action.data,
    }
  } else if (action.type === 'getNew') {
    return {
      ...state,
      newgoods: action.data,
    }
  } else if (action.type === 'getGoods') {
    console.log(action.data);
    return {
      ...state,
      goods: action.data,
    }
  }
  else if (action.type === 'getNavGoods') {
    return {
      ...state,
      navgoods: action.data,
    }
  }
  else if (action.type === 'getRecommendNav') {
    return {
      ...state,
      recNav: action.data,
    }
  }
  else {
    return { ...state }
  }
}

export default cateReducers