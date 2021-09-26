import { useEffect, useState } from 'react'
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import './order.scss'
import banner from '../../static/caitiao.jpg'
import OrderG from '../../components/order/orderG'
import { useDispatch } from 'react-redux'
import { AtFloatLayout } from "taro-ui"
import CcKeyboard from '../../components/cc-keyboard/cc-keyboard'
import { addOrder } from '../../store/actions/car/car'

const Order = () => {
  const dispatch = useDispatch()
  const order = Taro.getStorageSync('order')
  const [open, setopen] = useState(false)
  let [password, setpassword] = useState<any>([])
  let [a, seta] = useState('')

  useEffect(() => {
  }, [])

  // 下单
  let toOrder = () => {
    setopen(true)
  }
  // 键盘
  let clickKey = (e) => {
    a += e
    seta(a)
    let c = a.split('').slice(0, 4)
    setpassword([...c])
  }
  //删除
  let backspace = () => {
    password.splice(password.length - 1, 1)
    setpassword([...password])
  }

  useEffect(() => {
    let a = password.join('')
    if (a === '1234') {
      dispatch(addOrder(order.price, ' 成都市东门大桥0000',
        order.count, order.goods, '13008267345'))
      setopen(false)
    }
  }, [password])

  return (
    <div className='order' style={{ paddingTop: Taro.getEnv() === 'WEB' ? '40px' : '' }}>
      {/* 头部 */}
      <div className='mb-10' >
        {
          Taro.getEnv() === 'WEB' ?
            <AtNavBar
              fixed={true}
              color='#000'
              title='订单'
              leftIconType='chevron-left'
              onClickLeftIcon={() => Taro.navigateBack()}
            />
            : ''
        }
      </div>
      {/* 地址 */}
      <div className='adress p-10 flex jcsb'>
        <div>
          <div className='flex mb-10'>
            <div className='mr-10'>xx</div>
            <div >13008267345</div>
          </div>
          <div>
            成都市东门大桥0000
          </div>
        </div>
        <div>
          &gt;
        </div>
      </div>
      <div>
        <img src={banner} alt="" style={{ width: '100vw', height: '5px' }} />
      </div>

      {/* 商品列表 */}

      <OrderG></OrderG>
      {/* 底部 */}
      <div className='foot flex'>
        <div className='flex jcc'>
          <div className='t-a-c'>
            <div className='t-a-c'>总价</div>
            <div className='t-a-c'>￥{order.price}</div>
          </div>
        </div>
        <div className='flex jcc font-c-w'
          style={{ backgroundColor: '#FF6702' }}
          onClick={toOrder}>立即下单({order.count})</div>
      </div>

      {/* 键盘 */}
      <AtFloatLayout isOpened={open} title="输入密码" onClose={() => setopen(false)}>
        <div className='m-tb-10 flex jcsa'>
          <div className='p-t'>
            {
              password[0] ? '*' : ''
            }
          </div>
          <div className='p-t'>
            {
              password[1] ? '*' : ''
            }
          </div>
          <div className='p-t'>
            {
              password[2] ? '*' : ''
            }
          </div>
          <div className='p-t'>
            {
              password[3] ? '*' : ''
            }
          </div>

        </div>
        <CcKeyboard clickKey={clickKey} backspace={backspace}></CcKeyboard>
      </AtFloatLayout>

    </div>
  )
}

export default Order
