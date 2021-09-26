import { useState, useEffect } from 'react'
import { AtList, AtListItem } from "taro-ui"
import { Good } from '../../type/index'
import { AtTabs, AtTabsPane } from 'taro-ui'
import user from '../../static/6.jpg'

import home from '../../static/tabbar/icon-home.png'
import car from '../../static/tabbar/icon-cart.png'
import kf from '../../static/kefu.png'
import Taro from '@tarojs/taro';
import { AtFloatLayout } from "taro-ui"
import { AtInputNumber } from 'taro-ui'
import { addCart } from '../../store/actions/car/car'
import { useDispatch, useSelector } from 'react-redux'
import utils from '../../utils'
interface Props {
  details: Good
}

const GoodCell = (props: Props) => {
  const tabList = [
    { title: '商品详情' },
    { title: '商品参数' },]

  const foot = [
    {
      t: '首页',
      i: home,
      path: '/pages/index/index'
    },
    {
      t: '客服',
      i: kf,
      path: ''
    },
    {
      t: '购物车',
      i: car,
      path: '/pages/car/car'
    }
  ]
  const [current, setcurrent] = useState(0)
  const [vis, setvis] = useState(false)
  const [adds, setadds] = useState('定位中...')
  const [type, settype] = useState(-1)
  const [conut, setconut] = useState(1)
  const [chooseSpec, setchooseSpec] = useState<string[]>([])
  const dispatch = useDispatch()
  const total = useSelector((state: any) => state.car.total)
  // /点击底部
  let djfoot = (i) => {
    if (i === 1) {

    } else {
      Taro.switchTab({
        url: i
      })
    }
  }

  // 弹框
  let addcar = (i) => {
    if (!Taro.getStorageSync('user')) {
      Taro.showModal({
        title: '登录',
        content: '当前为未登录状态',
        confirmText: '去登录',
        success(res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    } else {
      setvis(true)
      settype(i)
    }
  }
  // 点击规格
  let djspec = (i, t) => {
    chooseSpec.splice(i, 1, t)
    setchooseSpec([...chooseSpec])
  }

  // 添加购物车
  let add = () => {
    setvis(false)
    // 添加购物车
    if (type === 0) {
      dispatch(addCart(conut, props.details, chooseSpec))
    } else if (type === 1) {
      // 立即购买
      let order = {
        count: conut,
        goods: [props.details],
        price: conut * Number(props.details.presentPrice),
      }
      Taro.setStorageSync('order', order)
      Taro.navigateTo({
        url: '/pages/order/order'
      })
    } else {
      return
    }
  }


  useEffect(() => {
    props.details.spec && props.details.spec.map((t, i) => {
      chooseSpec.push(t.checklist[0])
    })
    setchooseSpec([...chooseSpec])

    // utils.dw().then((res: any) => {
    //   setadds(res.data)
    // }).catch((err: any) => {
    //   setadds('定位失败')
    // })
    utils.getLocation(true).then((res: any) => {
      setadds(res.data)
    }).catch((err: any) => {
      setadds('定位失败')
    })
  }, [props.details])


  return (
    <div className='d-cell' style={{ paddingBottom: 60 }}>
      <AtList>
        <AtListItem
          arrow='right'
          title={`送至:` + adds}
        />
        {
          props.details.spec && props.details.spec.length ? <AtListItem
            arrow='right'
            title={'已选中:' + chooseSpec.join(',')}
            onClick={() => setvis(true)}
          />
            : null
        }

        <AtListItem
          arrow='right'
          title='用户评价'
          extraText='98%满意度'
        />
      </AtList>

      {/* 用户评价 */}
      <div className='p-10'>
        <div className=' b-coment flex'>
          {
            [0, 0, 0, 0, 0, 0, 0].map((t, i) => {
              return <div key={i} className='p-10 mr-10 comment'>
                <div className='flex mb-10'>
                  <div className='mr-10'>
                    <img src={user} alt="" style={{ width: 50, height: 50 }} />
                  </div>
                  <div>
                    <div className='mb-10'>作者</div>
                    <div>时间</div>
                  </div>
                </div>
                <div className='ellipsis-3 '>
                  ggjhklkjlkllksasdjasjaskdjasd撒低级卡速度就是快是多久啊看世界大赛
                </div>
              </div>
            })
          }

        </div>
      </div>

      {/* 商品详情 */}
      <div>
        <AtTabs current={current} tabList={tabList} onClick={(e) => { setcurrent(e) }}>
          <AtTabsPane current={current} index={0} >
            {
              props.details.detail &&
              <div dangerouslySetInnerHTML={{ __html: props.details.detail }}
                style={{ lineHeight: 0 }} className='html'>
              </div>
            }

          </AtTabsPane>
          <AtTabsPane current={current} index={1} >
            {
              props.details.specParams ?
                <div dangerouslySetInnerHTML={{ __html: props.details.detail }}
                  style={{ lineHeight: 0 }} className='html'>
                </div>
                :
                <div className='m-tb-10 t-a-c' >
                  暂无数据
                </div>
            }
          </AtTabsPane>
        </AtTabs>
      </div>

      {/* /底部 */}
      <div style={{ height: 50 }} className='flex footer'>
        {
          foot.map((t, i) => {
            return <div key={i} className='f-l flex-1 pos-rel' onClick={() => djfoot(t.path)}>
              <div className='flex jcc'>
                <img src={t.i} alt="" className='xs-img' />
              </div>
              <div className='t-a-c ' style={{ whiteSpace: 'nowrap' }}>
                {t.t}
              </div>
              {
                i === 2 && total ? <div className='bage' style={{ fontSize: '12px' }}>
                  {
                    total > 50 ? '50+' : total
                  }
                </div> : ''
              }

            </div>
          })
        }
        <div className='car t-a-c' onClick={() => addcar(0)}>
          加入购物车
        </div>
        <div className='buy t-a-c' onClick={() => addcar(1)}>
          立即购买
        </div>
      </div>

      {/* 弹出层 */}
      <div>
        <AtFloatLayout isOpened={vis} title="选择规格" scrollX={true}>
          <div className='p-10 b'>
            <div>
              <div className='flex a-i-fs'>
                <div className='mr-10'>
                  <img src={props.details.cover} alt="" className='l-img' />
                </div>
                <div className='width-100'>
                  <div className='mb-10'>
                    {props.details.name}
                  </div>
                  {
                    chooseSpec.length > 0 ?
                      <div style={{ width: '100%' }}>
                        已选中：{chooseSpec.join(',')}
                      </div>
                      : ''
                  }

                </div>
              </div>
              {/* 规格选项 */}
              {
                props.details.spec && props.details.spec.map((t, i) => {
                  return <div key={i}>
                    <div className='m-tb-10 font-w-7'>
                      {t.name}
                    </div>
                    <div className='flex flex-wrap'>
                      {
                        t.checklist.map((t1, i1) => {
                          return <div key={i1} className={`spec-item bgc-low-gray 
                          ${chooseSpec.includes(t1) ? 'act-spec' : ''}`}
                            onClick={() => { djspec(i, t1) }}>
                            {t1}
                          </div>
                        })
                      }
                    </div>
                  </div>
                })
              }
              <div className='m-tb-10 flex jcsb font-w-7'>
                <div>
                  商品数量
                </div>
                <AtInputNumber
                  type='number'
                  min={0}
                  max={10}
                  step={1}
                  value={conut}
                  onChange={(e) => setconut(e)}
                />
              </div>
            </div>
            {/* 确认按钮 */}
            <div className='m-t-10' style={{ height: 35 }}>
              <div className='qr' onClick={add}>确认</div>
            </div>
          </div>

        </AtFloatLayout>
      </div>
    </div >
  )
}

export default GoodCell
