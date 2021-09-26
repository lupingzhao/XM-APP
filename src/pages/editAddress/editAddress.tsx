import Taro from '@tarojs/taro'
import { useReactive } from 'ahooks'
import { AtNavBar, AtForm, AtInput, AtButton, AtSwitch } from 'taro-ui'
import { useState, useEffect } from 'react'
import { Picker, Text } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { useDispatch } from 'react-redux';
import { addAddress } from '../../store/actions/car/car'
interface Obj {
  username: any,
  address: any,
  mobile: any,
  detailAddress: any,
  isDefault: boolean
}
const EditAddress = () => {

  const [editinfo, seteditinfo] = useState<any>('')
  const dispatch = useDispatch()
  // addAddress = (username: string, mobile: string, address: number,
  //   detailAddress: string, isDefault: boolean)
  let from = useReactive<Obj>({
    username: '',
    address: '',
    mobile: '',
    detailAddress: '',
    isDefault: false
  })


  // 提交表单
  let onSubmit = () => {
    let boo = Object.values(from).every((t) => {
      return t !== ''
    })
    if (boo) {
      dispatch(addAddress(from.username, from.mobile,
        from.address, from.detailAddress, from.isDefault))
    } else {
      Taro.showToast({
        title: '有必填项未填写'
      })
    }

  }
  // 地区选择
  let onChange = (e) => {
    from.address = e.currentTarget.value.join(',')
  }


  useEffect(() => {
    seteditinfo(Taro.getStorageSync('editAddress'))
  }, [])


  return (
    <div className='edit' style={{
      paddingTop: Taro.getEnv() === 'WEB' ? '40px' : '',
    }}>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            fixed={true}
            color='#000'
            title='地址列表'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }
      <div className='mtb-25 p-10'>
        <AtForm>
          <AtInput
            required
            clear
            name='username'
            title='收货人'
            type='text'
            placeholder='请输入收货人名字'
            value={from.username}
            onChange={(e) => from.username = e}
          >

          </AtInput>
          <AtInput
            required
            clear
            name='mobile'
            title='联系电话'
            type='phone'
            maxlength={11}
            placeholder='请输入手机号'
            value={from.mobile}
            onChange={(e) => from.mobile = e}
          />

          {
            Taro.getEnv() === 'WEB' ?
              <AtInput
                required
                clear
                name='address'
                title='地区'
                type='text'
                placeholder='请输入地区'
                value={from.address}
                onChange={(e) => from.address = e}
              />
              :
              <div>
                <Picker mode='region' value={from.address} onChange={onChange}>
                  <div className='flex jcsb p-15 bor-b'>
                    <div >
                      <Text className='font-c-red'>*</Text>  选择地区
                    </div>
                    <div>
                      {from.address}
                    </div>
                  </div>
                </Picker>
              </div>
          }

          <AtInput
            required
            name='code'
            title='详细地址'
            type='text'
            placeholder='请输入详细地址'
            value={from.detailAddress}
            onChange={(e) => from.detailAddress = e}
          >
          </AtInput>

          <AtSwitch border={from.isDefault} title='设置默认地址' />
        </AtForm>
        <div className='m-tb-25'>


          {
            !editinfo ? <AtButton onClick={onSubmit} type='primary' circle> 新增</AtButton>
              : ''
          }

        </div>
        <div className='m-tb-25'>
          {
            editinfo ? <AtButton onClick={onSubmit} circle>
              删除
            </AtButton>
              : ''
          }

        </div>
      </div >

    </div >
  )
}

export default EditAddress
