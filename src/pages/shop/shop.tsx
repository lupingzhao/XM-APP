import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { getStoreHome } from '../../store/actions/my/my'
import { AtIndexes, AtSearchBar, AtNavBar } from 'taro-ui'
const Shop = () => {

  let dispatch = useDispatch()
  const shop = useSelector((state: any) => state.my.shop)

  useEffect(() => {
    let a = Taro.getCurrentInstance().router!.params
    dispatch(getStoreHome(a.name!, a.id!))
  }, [])

  // /去店铺
  let go = (e) => {
    Taro.setStorageSync('position', e)
    Taro.navigateTo({
      url: `/pages/mapLine/mapLine`
    })
  }


  return (
    <div style={{ paddingTop: Taro.getEnv() === 'WEB' ? '50px' : '' }}>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            fixed={true}
            color='#000'
            title='小米之家'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }
      <div className='p-10'>
        {
          shop && shop[0].store_list.map((t, i) => {
            return <div key={i} className='p-10 bor-b' style={{ fontSize: 12 }}
              onClick={() => go(t.position)}>
              <div className='flex mb-10'>
                <img src={t.position.icon} alt="" className='s-img' />
                <div>{t.store_name}</div>
              </div>
              <div className='mb-10'>{t.shop_time}</div>
              <div className='mb-10'>Tel；{t.tel}</div>
              <div className='mb-10'>服务:{t.support_service.join(',')}</div>
              <div className='t-a-r font-c-red' >去这里</div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Shop
