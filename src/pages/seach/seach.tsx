import React, { useState, useEffect } from 'react'
import { AtSearchBar } from 'taro-ui'
import back from '../../static/back.png'
import { useDispatch, useSelector } from 'react-redux';
import { search, getSearchWords } from '../../store/actions/seach/seach'
import './seach.scss'
import del from '../../static/hs.png'
import Taro from '@tarojs/taro';
import utils from '../../utils';

const Seach = () => {
  const [value, setvalue] = useState('')
  const dispatch = useDispatch()
  const searchData = useSelector((state: any) => state.seach.searchData)
  const hot = useSelector((state: any) => state.seach.hot)
  const [vis, setvis] = useState(false)
  const [history, sethistory] = useState<any>([])
  const [type, settype] = useState(false)
  // 输入框值改变时
  let onChange = (e) => {
    setvalue(e)
    setvis(true)
    dispatch(search(1, 10000, e))
  }

  // 去搜索结果页
  let go = (t) => {
    // 储存搜索记录
    utils.saveHistory({
      key: 'seach',
      data: t,
      attr: ''
    })
    Taro.navigateTo({
      url: `/pages/searchResult/searchResult?keyword=${t}`
    })
  }
  // 删除历史
  let delhis = () => {
    Taro.showModal({
      title: '删除记录',
      content: '删除所有历史记录',
      success: (res) => {
        if (res.confirm) {
          utils.delhistory('seach')
          sethistory('')
        } else if (res.cancel) {
        }
      }
    })

  }

  useEffect(() => {
    if (Taro.getEnv() === 'WEB') {
      settype(true)
    } else if (Taro.getEnv() === 'WEAPP') {
      settype(false)
    }
    dispatch(getSearchWords())
    sethistory(utils.getHistory('seach'))
  }, [])

  return (
    <div className='seach'>
      <div className='mb-10'>
        <div className='flex'>
          {
            type ? <img src={back} alt="" className='s-img' onClick={() => Taro.switchTab({
              url: '/pages/index/index'
            })} />
              : null
          }
          <div className='width-100'>
            <AtSearchBar
              value={value}
              onChange={onChange}
              onActionClick={() => go(value)}
            />
          </div>
        </div>
        {/* 搜索联想 */}
        {
          vis && searchData.length > 0 ? <div className='ss-lx' onClick={() => { setvis(false) }}>
            <div className='box' onClick={(e) => { e.stopPropagation() }}>
              {
                searchData && searchData.map((t, i) => {
                  return <div key={i} className='p-10 bgc-white border-b'
                    onClick={() => { go(t.name) }}>
                    {t.name}
                  </div>
                })
              }
            </div>
          </div>
            :
            null
        }
        {/* 历史记录 */}
        {
          history ? <div className='m-tb-10 p-10'>
            <div className='flex p-tb-10  jcsb'>
              <div>搜索记录</div>
              <div className='flex '>
                <img src={del} alt="" className='xs-img' onClick={delhis} />
              </div>
            </div>

            {/* 记录 */}
            <div className='flex flex-wrap'>
              {
                history && history.map((t, i) => {
                  return <div key={i} className='his-item' onClick={() => go(t)}>
                    {t}
                  </div>
                })
              }
            </div>
          </div>
            :
            null
        }



        {/* 搜索热词 */}
        <div className='m-tb-10 p-10'>
          <div className='flex p-tb-10  jcsb'>
            <div>搜索热词</div>
          </div>

          {/* 热词 */}
          <div className='flex flex-wrap '>
            {
              hot && hot.map((t, i) => {
                return <div key={i} className='hot-item ellipsis mb-10'
                  onClick={() => { go(t.name) }}>
                  {t.name}
                </div>
              })
            }
          </div>
        </div>
      </div>




    </div >
  )
}

export default Seach
