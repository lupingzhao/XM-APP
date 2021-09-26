import { useState, useEffect } from 'react'
import './login.scss'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import logo from '../../static/login/mi.png'
import { AtToast } from "taro-ui"
import { useDispatch, useSelector } from 'react-redux'
import { getCode, register, userLogin, mobileLogin } from '../../store/actions/my/my'
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { useReactive } from 'ahooks'
interface Obj {
  username: any,
  password: any,
  mobile: any,
  code: any,
}
const Login = () => {
  const tabList = [{ title: '用户名登陆' }, { title: '手机号登陆' }, { title: '注册' }]
  const [current, setcurrent] = useState(0)
  let from = useReactive<Obj>({
    username: '',
    password: '',
    mobile: '',
    code: '',
  })
  let [boo, setboo] = useState<any>(false)
  let [boo1, setboo1] = useState<any>(false)
  let [codedesc, setcodedesc] = useState<any>('发送验证码')
  const dispatch = useDispatch()
  const isrefis = useSelector((state: any) => state.my.isrefis)
  // 表单确认
  let onSubmit = () => {
    if (current === 0) {
      from.username && from.password ? boo = true : boo = false
    } else if (current === 1) {
      from.mobile && from.code ? boo = true : boo = false
    } else {
      boo = Object.values(from).every((t) => {
        return t
      })
    }
    // 每一项都填写 了
    if (boo) {
      if (current === 2) {
        dispatch(register(from.mobile, from.code, from.username, from.password))
      } else if (current === 1) {
        // 手机号登陆
        dispatch(mobileLogin(from.mobile, from.code))
      } else {
        dispatch(userLogin(from.username, from.password))
      }
    } else {
      Taro.showToast({
        title: '有必填项未填写',
        icon: 'none'
      })
    }
  }
  // 重置
  let onReset = () => {
    from = {
      username: '',
      password: '',
      mobile: '',
      code: '',
    }
    setboo1(false)
    setboo(false)
    setcodedesc('发送验证码')
  }
  // 切换导航栏
  let tab = (e) => {
    setcurrent(e)
    onReset()
    setboo1(false)
  }
  // 发送验证码
  let send = () => {
    let a = /^(?:(?:\+|00)86)?1\d{10}$/
    if (a.test(from.mobile)) {
      setboo1(false)
      if (codedesc === '发送验证码') {
        let time = 10
        codedesc = time + 's后可重新发送'
        let timer = setInterval(() => {
          time--
          codedesc = time + 's后可重新发送'
          if (time === 0) {
            clearInterval(timer)
            codedesc = '发送验证码'
            time = 10
          }
          setcodedesc(codedesc)
        }, 1000)
        setcodedesc(codedesc)
        dispatch(getCode(from.mobile))
      }
    } else {
      setboo1(true)
    }
  }

  useEffect(() => {

    if (isrefis) {
      setcurrent(0)
    }
  }, [isrefis])

  return (
    <div className='login'>
      <AtToast isOpened={boo1} text='请输入正确手机号'></AtToast>
      {/* <AtToast isOpened={boo} text='有必填项未填写'></AtToast> */}
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            color='#000'
            title='登陆'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }

      <div className='m-tb-25 flex jcc'>
        <img src={logo} alt="" className='l-img' />
      </div>
      <div className='tab'>
        <div>
          <AtTabs current={current} tabList={tabList} onClick={tab}>
          </AtTabs>
          <div className='m-tb-25'>
            <AtForm>
              {
                current !== 1 ?
                  <>
                    <AtInput
                      required
                      clear
                      name='username'
                      title='用户名'
                      type='text'
                      placeholder='请输入用户名'
                      value={from.username}
                      onChange={(e) => from.username = e}
                    >

                    </AtInput>
                    <AtInput
                      required
                      clear
                      name='password'
                      title='密码'
                      type='password'
                      placeholder='请输入密码'
                      value={from.password}
                      onChange={(e) => from.password = e}
                    /></>
                  : ''
              }
              {
                current !== 0 ?
                  <>
                    <AtInput
                      required
                      clear
                      name='mobile'
                      title='手机号'
                      type='phone'
                      placeholder='请输入手机号'
                      value={from.mobile}
                      onChange={(e) => from.mobile = e}
                    />

                    <AtInput
                      required
                      name='code'
                      title='验证码'
                      type='text'
                      placeholder='请输入验证码'
                      value={from.code}
                      onChange={(e) => from.code = e}
                    >
                      <div className='code' onClick={send}>{codedesc}</div>
                    </AtInput>
                  </>
                  : ''
              }
            </AtForm>
            <div className='m-tb-25'>
              <AtButton onClick={onSubmit} type='primary' circle>
                {
                  current !== 2 ? '登录' : '注册'
                }
              </AtButton>
            </div>
            <div className='mb-10'>
              <AtButton onClick={onReset} circle>重置</AtButton>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Login
