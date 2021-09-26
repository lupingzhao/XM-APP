
import Taro from '@tarojs/taro'
import bgc from '../../static/rank-list-bg.6cc4bce178.png'
import './car.scss'
import Recommend from '../../components/recommend/recommend'
import Goods from '../../components/car/goods'
import { AtNavBar } from 'taro-ui'
import { useEffect, useState } from 'react';
import { useReactive } from '_ahooks@2.10.9@ahooks'

const Car = () => {
  const [user, setuser] = useState<any>('')

  useEffect(() => {
    setuser(Taro.getStorageSync('user'))
    // Taro.hideTabBar()
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }, [])
  // <div className='t-a-c p-10' style={{ backgroundImage: `url(${bgc})` }}>  购物车</div>

  return (
    <div className='car' style={{
      paddingTop: Taro.getEnv() === 'WEB' ? '40px' : '',
    }}>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            fixed={true}
            color='#000'
            title='购物车'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }
      {/* 未登录 */}
      {
        !user ?
          <div className='out'>
            <div className='flex jcc'>
              <div>当前是未登录状态，</div>
              <div style={{ color: '#1695E4' }}
                onClick={() => Taro.navigateTo({ url: '/pages/login/login' })}> 去登录</div>
            </div>
          </div>
          :
          // 登陆
          <Goods></Goods>
      }


      {/* 推荐商品 */}
      <Recommend></Recommend>

    </div>
  )
}

export default Car
