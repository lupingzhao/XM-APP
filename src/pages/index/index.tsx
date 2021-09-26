import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Head from '../../components/home/head/Head';
import { banner, getNav, getNew, getRecommendNav, getNavGoods, getNotice } from './../../store/actions/home/home';
import './index.scss';
import { Banner, Nav, Good } from '../../type/index'
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem } from '@tarojs/components'
import { ScrollView, } from '@tarojs/components'
import RecGoods from '../../components/home/recGoods';
import { AtNoticebar } from 'taro-ui'
import Taro from '@tarojs/taro';


const Index = () => {
  const dispatch = useDispatch()
  const banners = useSelector((state: any) => state.home.banner)
  const nav = useSelector((state: any) => state.home.nav)
  const newgoods = useSelector((state: any) => state.home.newgoods)
  const recNav = useSelector((state: any) => state.home.recNav)
  const notice = useSelector((state: any) => state.home.notice)
  let [act, setAct] = useState<number>(0)


  // 去详情
  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }
  let tab = (t: string, i: number) => {
    setAct(i)
    dispatch(getNavGoods(t))
  }
  // 页面加载
  useEffect(() => {
    dispatch(banner())
    dispatch(getNav())
    dispatch(getNew())
    dispatch(getRecommendNav())
    dispatch(getNotice())

  }, [])

  useEffect(() => {
    if (recNav.length) {
      dispatch(getNavGoods(recNav[0]._id))
    }
  }, [recNav])

  return (
    <div className='bgc-low-gray home'>
      <Head></Head>
      <AtNoticebar icon='volume-plus' marquee speed={50}>
        <div className='flex'>
          {
            notice && notice.map((t, i) => {
              return <div key={i} style={{ marginRight: 20 }}>
                {i + 1}、 {t.content}
              </div>
            })
          }
        </div>
      </AtNoticebar>
      <div>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {
            banners && banners.map((i: Banner, index: number) => {
              return <SwiperItem key={index}>
                <img src={i.url} alt="" className='img' />
              </SwiperItem>
            })
          }
        </Swiper>

        {/* 导航栏 */}
        <div className={`flex flex-wrap jcsb bgc-white m-tb-10`}>
          {
            nav && nav.map((t: Nav, i: number) => {
              return <img src={t.url} alt="" className='width-19' style={{ height: 80 }} key={i} />
            })
          }
        </div>

        {/* 上新 */}
        <div className='bgc-white m-tb-10'>
          <div className='flex p-10'>
            <div>人气上新</div>
          </div>
          <div className={`m-tb-10 grid nav p-10`}>
            {
              newgoods && newgoods.map((t: Good, i: number) => {
                return i < 3 ? <div key={i} className='t-a-c'
                  onClick={() => { goto(t._id) }}>
                  <img src={t.cover} alt="" className='goods ' />
                  <div>
                    {t.name}
                  </div>
                </div> : ''

              })
            }
          </div>
        </div>

        {/* 推荐导航栏 */}
        <div className='p-10 bgc-white scroll-x'>
          <ScrollView
            className='scrollview-X'
            scrollX
            scrollWithAnimation
          >
            {
              recNav && recNav.map((t, i: number) => {
                return <div key={i} className='recnav t-a-c p-10' onClick={() => tab(t._id, i)}>
                  <div className='mb-10'>
                    {t.name}
                  </div>
                  <div className={`p-5  b-radius-10 ${act === i ? 'desc' : ''}`}>
                    {t.desc}
                  </div>
                </div>
              })
            }

          </ScrollView>
        </div >

        {/* 商品 */}
        <div>
          <RecGoods></RecGoods>
        </div>

      </div >
    </div >
  )
}

export default Index
