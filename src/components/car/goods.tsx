import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, updateCart, delCart } from '../../store/actions/car/car'
import '../../pages/car/car.scss'
import no from '../../static/cart.png'
import Taro from '@tarojs/taro';
import { AtCheckbox, AtInputNumber } from 'taro-ui'
import del from '../../static/hs.png'
import { useComputed } from '../../hooks/useComputed/index'

const Goods = () => {

  const dispatch = useDispatch()
  let data = useSelector((state: any) => state.car.data)
  let [goods, setgoods] = useState<any[]>([])
  const all = [{
    value: 'all',
    label: '全选'
  }]
  let [alllist, setalllist] = useState<any[]>([])

  useEffect(() => {
    dispatch(getCart())
  }, [])


  // 单选框
  let change = (e, i) => {
    goods[i].selectedList = e
    setgoods([...goods])
    let boo = goods.every(t => {
      return t.selectedList.length
    })
    alllist = ['all']
    boo ? setalllist(alllist) : setalllist([])
  }
  // 全选
  let changeall = (e) => {
    setalllist(e)
    if (e[0]) {
      goods.map((t: any) => {
        t.selectedList = [t._id]
      })
    } else {
      goods.map((t: any) => {
        t.selectedList = []
      })
    }
    setgoods([...goods])
  }
  // 步进器
  let changeCount = (e, i, id) => {
    goods[i].count = e
    setgoods([...goods])
    dispatch(updateCart(id, e))
  }
  useEffect(() => {
    goods = data
    setgoods(goods)
  }, [data])

  //删除商品
  let dels = (id, i) => {
    Taro.showModal({
      title: '删除商品',
      content: '将该商品从购物车中删除',
      success: (res) => {
        if (res.confirm) {
          goods.splice(i, 1)
          setgoods([...goods])
          dispatch(delCart(id))
        }
      }
    })
  }
  // 去详情
  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }
  // 去结算
  let toOrder = () => {
    let a = goods && goods.filter(t => {
      return t.selectedList.length
    })
    let count = 0
    a.map(t => {
      count += t.count
    })
    if (a.length) {
      let list = {
        count: count,
        goods: a,
        price: price
      }
      Taro.setStorageSync('order', list)
      Taro.navigateTo({ url: '/pages/order/order' })
    } else Taro.showToast({
      title: '没有需要结算的商品',
      icon: 'none'
    })
  }
  // 计算
  let price = useComputed(() => {
    let sum = 0
    goods && goods.filter(t => {
      return t.selectedList.length
    }).map(t1 => {
      sum += t1.count * t1.goods.originalPrice
    })
    return sum
  }, goods)


  return (
    <div className='C-LOGIN'>
      {
        data && data.length === 0 ?
          <div className='t-a-c m-tb-25'>
            <img src={no} alt="" />
            <div className='m-tb-10 flex jcc'>
              <div>当前购物车为空,</div>
              <div style={{ color: '#1695E4' }}
                onClick={() => Taro.switchTab({ url: '/pages/index/index' })}>去购物</div>
            </div>
          </div>
          :
          <div className='p-10'>
            <AtCheckbox
              options={all}
              selectedList={alllist}
              onChange={changeall}
            />
            {/* 购物车不为空 */}
            {
              goods && goods.map((t: any, i) => {
                return <div key={i}
                  className='flex a-i-fs mb-10 p-tb-10 bor-b box width-100'>
                  <div className='flex'>
                    <AtCheckbox
                      options={[{
                        value: t._id,
                        label: ''
                      }]}
                      selectedList={t.selectedList}
                      onChange={(e) => change(e, i)}
                    />
                  </div>
                  <div className='flex a-i-fs width-100'>
                    <img src={t.goods.cover} alt="" className='img'
                      onClick={() => goto(t.goods._id)} />
                    <div className='width-100 p-10'>
                      <div className='mb-10'>{t.goods.name}</div>
                      <div className='mb-10' style={{ fontSize: 12 }}>
                        {
                          t.spec.join(',')
                        }
                      </div>
                      <div className='mb-10 font-c-red'>
                        ￥{t.goods.originalPrice}
                      </div>
                      <div className='flex jcsb width-100'>
                        <AtInputNumber
                          type='number'
                          min={0}
                          max={10}
                          step={1}
                          value={t.count}
                          onChange={(e) => { changeCount(e, i, t._id) }}
                        />
                        <div className='flex '>
                          <img src={del} alt="" className='xs-img'
                            onClick={() => dels(t._id, i)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              })

            }
            {/* 底部 */}
            <div className='foot flex' style={{ bottom: Taro.getEnv() === 'WEB' ? '52px' : '0px' }}>
              <div className='flex jcc'>
                <div className='t-a-c'>
                  <div className='t-a-c'>总价</div>
                  <div className='t-a-c'>￥{price}</div>
                </div>
              </div>
              <div className='flex jcc'
                onClick={() => Taro.navigateTo({ url: '/pages/index/index' })}
                style={{ backgroundColor: '#F4F4F4' }}>在看看</div>
              <div className='flex jcc font-c-w'
                style={{ backgroundColor: '#FF6702' }}
                onClick={toOrder}>立即结算</div>
            </div>
          </div>
      }



    </div >
  )
}

export default Goods
