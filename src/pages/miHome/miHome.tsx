import { useState, useEffect } from 'react'
import { AtIndexes, AtSearchBar, AtNavBar } from 'taro-ui'
import { useDispatch, useSelector, } from 'react-redux';
import Taro from '@tarojs/taro';
import { getAreaList, searchAreaList } from '../../store/actions/my/my'


const MiHome = () => {
  const dispatch = useDispatch()
  const city = useSelector((state: any) => state.my.city)
  const seachcity = useSelector((state: any) => state.my.seachcity)
  const [value, setvalue] = useState('')

  let click = (e) => {
    Taro.navigateTo({
      url: `/pages/shop/shop?id=${e.id}&name=${e.name}`
    })
  }
  let onChange = (e) => {
    setvalue(e)
    e ? dispatch(searchAreaList(e)) : ''
  }
  useEffect(() => {
    dispatch(getAreaList())
  }, [])

  return (
    <div style={{ paddingTop: Taro.getEnv() === 'WEB' ? '50px' : '' }}>
      {
        Taro.getEnv() === 'WEB' ?
          <AtNavBar
            fixed={true}
            color='#000'
            title='小米之家'
            leftIconType='chevron-left'
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          : ''
      }
      <AtSearchBar
        showActionButton
        value={value}
        onChange={onChange}
      />

      {
        value ?
          <div>
            {
              seachcity.length > 0 ?
                <div className='p-15'>
                  {
                    seachcity.map((t, i) => {
                      return <div key={i} className='p-tb-10' onClick={() => click(t)}>
                        {t.name}
                      </div>
                    })
                  }
                </div>
                :
                <div className='m-tb-25 p-10 t-a-c'>
                  暂无数据
                </div>
            }
          </div>
          :
          <div>
            {
              city && <AtIndexes
                list={city}
                onClick={click}
                topKey=''
                isShowToast={false}
              >
              </AtIndexes>
            }

          </div>

      }

    </div>
  )
}

export default MiHome
