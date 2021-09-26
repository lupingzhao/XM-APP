import { useEffect, useState } from 'react'
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import '../car/car.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAppAddress } from '../../store/actions/car/car'
import { delAddress } from '../../store/actions/car/car'
const Address = () => {
  const list = useSelector((state: any) => state.car.address)
  let dispatch = useDispatch()

  // 编辑地址
  let edit = (t, i) => {
    Taro.showModal({
      title: '删除地址',
      content: '删除该地址',
      success: function (res) {
        if (res.confirm) {
          dispatch(delAddress(t))
        }
      }
    })
  }

  useEffect(() => {
    dispatch(getAppAddress())
  }, [])

  return (
    <div className='address' style={{
      paddingTop: Taro.getEnv() === 'WEB' ? '40px' : '',
      paddingBottom: '50px'
    }}>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            fixed={true}
            color='#000'
            title='地址列表'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }

      {/* 地址 */}

      <div className='p-15'>
        {
          list && list.map((t, i) => {
            return <div className='list mb-10 p-10 '
              key={i}>
              <div className='flex mb-10 '>
                <div>{t.username}</div>
                <div className='m-lr-10'>{t.mobile}</div>
                <div className='mr' style={{ padding: t.isDefault ? '2px 5px' : '' }}>
                  {
                    t.isDefault ? '默认' : ''
                  }
                </div>
              </div>
              <div className='mb-10'>
                {t.address + t.detailAddress}
              </div>
              <div className='font-c-red t-a-r' onClick={() => edit(t.id, i)}>
                删除
              </div>
            </div>
          })
        }
      </div>

      <div className='foot1 p-10'
        onClick={() => {
          Taro.navigateTo({ url: '/pages/editAddress/editAddress' }),
            Taro.removeStorageSync('editAddress')
        }}>
        <AtButton type='primary'>新增</AtButton>
      </div>

    </div>
  )
}

export default Address
