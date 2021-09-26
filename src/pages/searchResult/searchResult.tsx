import { useState, useEffect } from 'react'
import back from '../../static/back.png'
import { AtSearchBar, AtDivider } from 'taro-ui'
import { useDispatch, useSelector } from 'react-redux';
import { search, } from '../../store/actions/seach/seach'
import '../seach/seach.scss'
import Taro from '@tarojs/taro';
import Recommend from '../../components/recommend/recommend';
import goods from 'server/app/model/goods';
import no from '../../static/no.png'

const SearchResult = () => {
  const [value, setvalue] = useState('')
  let [c, setc] = useState(1)
  const [size, setsize] = useState(5)
  const [type, settype] = useState(false)
  // $instance = getCurrentInstance()

  const dispatch = useDispatch()
  const searchData = useSelector((state: any) => state.seach.searchData)
  const total = useSelector((state: any) => state.seach.total)

  // 输入框值改变时
  let onChange = (e) => {
    setvalue(e)
    dispatch(search(c, size, e))
  }
  // let 加载更多
  let more = () => {
    if (total !== searchData.length) {
      c++
      setc(c)
      dispatch(search(c, size, value, true))
    }
  }

  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }

  useEffect(() => {
    if (Taro.getEnv() === 'WEB') {
      settype(true)
    } else if (Taro.getEnv() === 'WEAPP') {
      settype(false)
    }

    let a: any = Taro.getCurrentInstance().router!.params.keyword
    setvalue(a)
    dispatch(search(c, size, a))
  }, [])



  return (
    <div className='s-reult'>
      <div className='flex'>
        {
          type ? <img src={back} alt="" className='s-img' onClick={() => Taro.navigateBack()} />
            : null
        }
        <div className='width-100'>
          <AtSearchBar
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
      {/* 搜索结果 */}
      {
        searchData.length ? <div className='m-tb-10 p-10' >
          {
            searchData && searchData.map((t, i) => {
              return <div key={i} className='flex a-i-fs mb-10 g-box'
                onClick={() => goto(t._id)}>
                <div className='img mr-10'>
                  <img src={t.cover} alt="" />
                </div>
                <div className='ml-10'>
                  <div>{t.name}</div>
                  <div className='m-tb-10 font-c-red'>￥{t.presentPrice}</div>
                </div>
              </div>
            })
          }
          <AtDivider fontSize={16} >
            <span onClick={more}>{
              total !== searchData.length ? '点击加载更多' : '没有更多了'
            }</span>
          </AtDivider>
        </div>
          :
          <div>
            {/* 没有相关商品 */}
            <div className='no'>
              <img src={no} alt="" />
            </div>
            <Recommend></Recommend>
          </div>
      }

    </div >
  )
}

export default SearchResult
