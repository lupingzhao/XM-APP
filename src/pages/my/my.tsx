import { useEffect, useState } from 'react'
import banner from '../../static/user/bj.png'
import './my.scss'
import userimg from '../../static/user/touxiang.png'
import Taro from '@tarojs/taro'
import { AtList, AtListItem } from "taro-ui"
import qbdd from '../../static/my1/20210902142635.png'
import mi from '../../static/my1/20210902142442.png'
import kf from '../../static/my1/20210902142653.png'
import dz from '../../static/my1/20210902142705.png'

const My = () => {
  const [user, setuser] = useState<any>('')

  let list = [
    {
      t: '全部订单',
      i: qbdd,
      p: '/pages/orderList/orderList'
    },
    {
      t: '小米之家',
      i: mi,
      p: '/pages/miHome/miHome'
    },
    {
      t: '在线客服',
      i: kf,
      p: '/pages/customerService/customerService'
    },
    {
      t: '地址管理',
      i: dz,
      p: '/pages/address/address'
    },
  ]
  // 退出
  let logout = () => {
    Taro.showModal({
      title: '退出',
      content: '退出登录状态',
      success: function (res) {
        if (res.confirm) {
          setuser('')
          Taro.clearStorage()
          Taro.switchTab({ url: '/pages/index/index' })
        }
      }
    })
  }
  // 点击列表
  let onClick = (i) => {
    if (user) {
      Taro.navigateTo({
        url: i
      })
    } else {
      Taro.showModal({
        title: '登录',
        content: '检测到当前为未登录状态，去登录',
        success: function (res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    }
  }

  useEffect(() => {
    setuser(Taro.getStorageSync('user'))
  }, [])
  return (
    <div className='my'>
      <div className='head flex p-10 a-i-fs' style={{ backgroundImage: `url(${banner})` }}>
        <div className='m-lr-10'>
          <img src={userimg} alt="" className='l-img' />
        </div>
        {
          user ?
            <div>
              <div style={{ fontSize: 16 }} className='m-tb-10'>{user.username}</div>
              <div onClick={logout}>
                退出登录
              </div>
            </div>
            :
            <div style={{ fontSize: 16 }}
              onClick={() => Taro.navigateTo({ url: '/pages/login/login' })}>
              登录/注册
            </div>
        }
      </div>

      <div className='m-tb-10'></div>
      {/* 内容 */}
      <AtList>
        {
          list.map((t, i) => {
            return <AtListItem
              key={i}
              title={t.t}
              arrow='right'
              thumb={t.i}
              onClick={() => onClick(t.p)}
            />
          })
        }
      </AtList>
    </div>
  )
}

export default My
