import { useEffect } from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { goodsDetail } from '../../store/actions/seach/seach'
import Info from '../../components/details/info'
import GoodCell from './../../components/details/goodCell';


const Details = () => {
  const dispatch = useDispatch()
  const detail = useSelector((state: any) => state.seach.detail)


  useEffect(() => {
    let id = Taro.getCurrentInstance().router!.params.id
    dispatch(goodsDetail(id!))
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }, [])

  return (
    <div className='detail'>
      {/* 轮播 */}
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
        style={{ height: '250px' }}>
        {
          detail.pic && detail.pic.map((t, i) => {
            return <SwiperItem key={i}>
              <img src={t} alt="" className='img-sp' />
            </SwiperItem>
          })
        }
      </Swiper>

      <div>
        {/* 商品信息 */}
        <Info details={detail}></Info>
      </div>

      {/*  {/* 地址 评价 规格 */}
      <GoodCell details={detail}></GoodCell>

    </div >
  )
}

export default Details
