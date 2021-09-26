import { useEffect, useState } from 'react'
import { } from 'react-redux'
import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui'
import utils from '../../utils/index'
import { CoverView, Map } from '@tarojs/components'
import s from '../../static/my1/20210902142442.png'

const MapLine = () => {
  let key = 'd7549ad51cff75fb27df6434d5e44173'
  let amapFile = require('../../lib/amap-wx.js')
  let myAmapFun = new amapFile.AMapWX({
    key
  })

  const [a, seta] = useState<number[]>([])
  let [markers, setmarkers] = useState<any>('')
  const [polyline, setpolyline] = useState<any[]>([])
  const [route, setroute] = useState<any>('')


  // 路线
  let wx = (pos, c) => {
    // 原生地图 微信地图封装
    // Taro.chooseLocation({
    //   latitude: pos[1],
    //   longitude: pos[0],
    //   success: (data) => {
    //     console.log(data)
    //   }
    // })
    myAmapFun.getDrivingRoute({
      origin: pos.join(','),
      destination: c.join(','),
      success: function (data) {
        // 页面显示有时会有延迟 加上判断就能看见路线规划了
        var points = [] as any;
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
          let polylines: any = [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
          Taro.setStorageSync('line', polylines)
          setpolyline([...polylines])
        }
      },
      fail(info) {
        console.log('08980876697')
      }

    })
  }





  useEffect(() => {
    let a: any = Taro.getStorageSync('position')
    // 开始位置

    // 结束位置
    utils.getLocation(false, a).then((res: any) => {

      if (Taro.getEnv() !== 'WEB') {
        // 起始点
        markers = [
          {
            iconPath: s,
            id: 0,
            latitude: res.pos[1],
            longitude: res.pos[0],
            width: 23,
            height: 33
          }, {
            iconPath: s,
            id: 1,
            latitude: a[1],
            longitude: a[0],
            width: 24,
            height: 34
          }

        ]
        setmarkers(markers)
        wx(res.pos, a)
      } else {
        setroute(res.rote)
      }
    }).catch(err => {
      console.log(err)
    })
    a = [Number(a.lng), Number(a.lat)]
    seta([...a])
  }, [])


  return (
    <div style={{ paddingTop: Taro.getEnv() === 'WEB' ? '50px' : '' }} className='height-100'>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            fixed={true}
            color='#000'
            title='导航'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }


      {
        Taro.getEnv() === 'WEB' ?
          <>
            <div id="container" style={{
              height: '80vh', backgroundColor: '#f5f5f5',
              position: 'relative', zIndex: 0
            }}>
            </div>
            {
              route && <div
                className='t-a-c p-15  bgc-white'
                style={{ height: '20vh', position: 'relative', zIndex: 99999999999 }}>
                驾车路线：{route.distance / 1000}公里，时长：  {(route.time / 3600).toFixed(2)}小时
              </div>
            }
          </>

          :
          <>
            {

              markers && polyline[0] ?
                <Map
                  scale={12}
                  latitude={a[1]}
                  longitude={a[0]}
                  polyline={polyline}
                  markers={markers}
                  style={{ height: '100vh', width: '100vw' }}
                >
                  <div className='bgc-white p-10'>
                    {markers[0].latitude}---
                    {polyline[0].color}
                  </div>
                </Map>
                : ''
            }
          </>

      }

    </div >
  )
}

export default MapLine
