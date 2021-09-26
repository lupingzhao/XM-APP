const initState = {
  banner: [],
  nav: [],
  goods: [],
  newgoods: [],
  navgoods: [],
  recNav: [],
  notice: []
}

interface Action {
  type: string,
  data: any,
}

const homeReducers = (state = initState, action: Action) => {
  if (action.type === 'banner') {
    return {
      ...state,
      banner: action.data,
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
  else if (action.type === 'getNotice') {
    return {
      ...state,
      notice: action.data,
    }
  }
  else {
    return { ...state }
  }
}

export default homeReducers