export default {
  // 配置路由
  pages: [
    'pages/index/index',
    'pages/seach/seach',
    'pages/category/category',
    'pages/my/my',
    'pages/car/car',
    'pages/details/details',
    'pages/searchResult/searchResult',
    'pages/login/login',
    'pages/address/address',
    'pages/editAddress/editAddress',
    'pages/order/order',
    'pages/orderList/orderList',
    'pages/miHome/miHome',
    'pages/customerService/customerService',
    'pages/evaluate/evaluate',
    'pages/shop/shop',
    'pages/mapLine/mapLine'

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#FF671D",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "static/tabbar/icon-home.png",
        selectedIconPath: "static/tabbar/icon-home-selected.png"
      }, {
        pagePath: "pages/category/category",
        text: "分类",
        iconPath: "static/tabbar/icon-category.png",
        selectedIconPath: "static/tabbar/icon-category-selected.png"
      },
      {
        pagePath: "pages/car/car",
        text: "购物车",
        iconPath: "static/tabbar/icon-cart.png",
        selectedIconPath: "static/tabbar/icon-cart-selected.png"
      }, {
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "static/tabbar/icon-user.png",
        selectedIconPath: "static/tabbar/icon-user-selected.png"
      }
    ]
  },
}
