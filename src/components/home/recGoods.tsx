import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Good } from '../../type/index'
import { ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro';

const RecGoods = () => {

  const navgoods = useSelector((state: any) => state.home.navgoods)
  let [top, settop] = useState<number>(0)

  let onScroll = (e) => {
    settop(e.detail.scrollTop)
  }
  // 去详情
  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }
  useEffect(() => {
    settop(0)
  }, [navgoods])
  return (
    <div className='reGoods ' >
      <ScrollView scrollTop={top} onScroll={onScroll} scrollY={true} style={{ height: '100vh' }}>
        <div className='flex  flex-wrap p-10 jcsb'>
          {
            navgoods && navgoods.map((t: Good, i: number) => {
              return <div key={i} className='b-radius-10 box  t-a-c ' onClick={() => goto(t._id)}>
                <div>
                  <img src={t.cover} alt="" className='cover' />
                </div>
                <div className='m-tb-10 p-10 ellipsis'>
                  {t.name}
                </div>
                <div>
                  ￥{t.presentPrice}
                </div>
              </div>
            })
          }

        </div>
      </ScrollView>
    </div >
  )
}

export default RecGoods
