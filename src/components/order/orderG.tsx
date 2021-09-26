import { useState, useEffect } from 'react'
import '../../pages/order/order.scss'
import Taro from '@tarojs/taro'


const OrderG = () => {

  const order = Taro.getStorageSync('order').goods

  return (
    <div className='p-10 orderg'>
      {
        order && order.map((t, i) => {
          return <div key={i} className='flex a-i-fs mb-10 bgc-low-gray b-radius-10 p-10'>
            <div className='flex mr-10'>
              <img src={t.goods.cover} alt="" className='img' />
            </div>
            <div className='width-100'>
              <div className='mb-10'>{t.goods.name}</div>
              <div style={{ fontSize: 12 }} className='mb-10'>
                {t.spec.join(',')}
              </div>
              <div className='flex mb-10'>
                <div className='font-c-red mr-5'>￥{t.goods.presentPrice}</div>
                <div> X {t.count}</div>
              </div>
              <div className='t-a-r font-c-red'>
                ￥ {t.goods.presentPrice * t.count}
              </div>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default OrderG
