import { useState } from 'react'
import logo from '../../../static/login/mi.png'
import './head.scss'
import sousuo from '../../../static/sousuo.png';
import Taro from '@tarojs/taro'
import userimg from '../../../static/icon-user.png'

const Head = () => {

  // 输入框获取焦点
  let foucs = () => {
    Taro.navigateTo({
      url: '/pages/seach/seach'
    })
  }
  let my = () => {
    Taro.switchTab({
      url: '/pages/my/my'
    })
  }

  return (

    <div className='p-10 flex  bgc-white home'>
      <img src={logo} alt="" className='s-img' />
      <div className={`flex-1 m-lr-10 p-5 b flex b-radius-10 ipt`} onClick={foucs}>
        <img src={sousuo} alt="" className='s-img' />
        搜索商品名称
      </div>
      <div>
        <img src={userimg} alt="" className='s-img' onClick={my} />
      </div>
    </div>
  )
}

export default Head
