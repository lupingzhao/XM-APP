import { useEffect } from 'react'
import '../../pages/seach/seach.scss'
import { AtSearchBar, AtDivider } from 'taro-ui'
import { Good } from '../../type/index'
import { useSelector, useDispatch } from 'react-redux'
import { getRecommend } from '../../store/actions/seach/seach'

import Taro from '@tarojs/taro';


const Recommend = () => {

  // 获取推荐商品
  const recgoods = useSelector((state: any) => state.seach.recgoods)
  const dispatch = useDispatch()
  // 去详情
  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }

  useEffect(() => {
    dispatch(getRecommend())
  }, [])

  return (
    <div className='recmmend'>
      <AtDivider fontSize={16} content='为你推荐' />
      <div className='m-tb-10 flex'>
        {/* 推荐商品 */}
        <div className='flex  flex-wrap p-10 jcsb'>
          {
            recgoods && recgoods.map((t: Good, i: number) => {
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
      </div>
    </div>
  )
}

export default Recommend
