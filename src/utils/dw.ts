let key = ''
let amapFile = '' as any
let myAmapFun = '' as any
import Taro from '@tarojs/taro';
import AMapLoader from '@amap/amap-jsapi-loader'
if (Taro.getEnv() === 'WEB') {
  key = '8beb154cd241eec3682a22c06d2e3d95'
} else {
  key = 'd7549ad51cff75fb27df6434d5e44173'
  amapFile = require('../lib/amap-wx.js')
  myAmapFun = new amapFile.AMapWX({
    key
  })
}

export default {
  // 定位
  dw() {
    if (Taro.getEnv() === 'WEB') {
      return new Promise((resovle, reject) => {
        AMapLoader.load({
          key,
          version: '1.4.15',
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: '1.3.2' // Loca 版本，缺省 1.3.2
          }
        })
          .then(AMap => {
            AMap.plugin('AMap.Geolocation', () => {
              console.log(77)
              let geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
              })
              geolocation.getCurrentPosition((status, result) => {
                if (status == 'complete') {
                  resovle({
                    code: 200,
                    msg: '定位成功',
                    data: result.formattedAddress,
                  })

                } else {
                  Taro.showToast({
                    title: '定位失败'
                  })
                  reject({
                    code: 500,
                    msg: '定位失败',
                    data: '定位失败',
                  })
                }

              })
            })

          })
      })

    } else {
      return new Promise((resovle, reject) => {
        myAmapFun.getRegeo({
          success: data => {
            console.log(data)
            //成功回调
            resovle({
              code: 200,
              msg: '定位成功',
              data: data[0].name + data[0].desc,
            })
          },
          fail: info => {
            //失败回调
            reject({
              code: 500,
              msg: '定位失败',
              info
            })
          }
        })

      })

    }

  },
  dw1() {
    if (Taro.getEnv() === 'WEB') {
      AMapLoader.load({
        key,
        version: '1.4.15',
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '1.3.2' // Loca 版本，缺省 1.3.2
        }
      })
        .then(AMap => {
          AMap.plugin('AMap.Geolocation', () => {
            console.log(77)
            let geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,
              // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonOffset: new AMap.Pixel(10, 20),
              //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,
              //  定位按钮的排放位置,  RB表示右下
              buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition((status, result) => {
              if (status == 'complete') {
                return result.formattedAddress
              } else {
                Taro.showToast({
                  title: '定位失败'
                })
                return '定位失败'
              }

            })
          })

        })


    } else {

      myAmapFun.getRegeo({
        success: data => {
          console.log(data)
          return data[0].name + data[0].desc
        },
        fail: info => {
          //失败回调
          return '定位失败'
        }
      })
    }
  },
}