import { useEffect } from 'react'
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { getAppOrder } from '../../store/actions/car/car'

const OrderList = () => {

  const dispatch = useDispatch()
  const order = useSelector((state: any) => state.car.order)
  // 去详情
  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }

  useEffect(() => {
    dispatch(getAppOrder())
  }, [])

  return (
    <div className='ol'>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            color='#000'
            title='全部订单'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }


      <div className='p-15'>
        {/* 内容 */}
        {
          order && order.map((t, i) => {
            return <div key={i} className='p-10 b-box'>
              <div className='mb-10 flex jcsb' style={{ fontSize: 12 }}>
                <div>
                  下单时间： {t.pay_time}
                </div>

              </div>
              <div className='mb-10'>
                {
                  t.goods_list.map((t1, i1) => {
                    return <div key={i1} className='flex box'>
                      <img src={t1.goods.cover} alt="" className='img'
                        onClick={() => goto(t1.goods._id)} />
                      <div className='width-100 p-10'>
                        <div className='mb-10'>{t1.goods.name}</div>
                        <div className='mb-10' style={{ fontSize: 12 }}>
                          {
                            t1.spec.join(',')
                          }
                        </div>
                        <div className='mb-10 font-c-red'>
                          ￥{t1.goods.originalPrice}
                        </div>
                        <div className='flex jcsb t-a-c'>
                          <div></div>
                          <div className='pj t-a-r '
                            onClick={() => {
                              Taro.navigateTo({
                                url: `/pages/evaluate/evaluate?id=${t1._id}`
                              }), Taro.setStorageSync('eve', t1.goods)
                            }}
                            style={{ width: 'fit-content' }}>
                            去评价
                          </div>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
              <div className='t-a-r mb-10'>
                {t.address}
              </div>
              <div className='t-a-r mb-10'>
                {t.mobile}
              </div>
              <div className='t-a-r mb-10 font-c-red'>
                ￥  {t.price}
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default OrderList
