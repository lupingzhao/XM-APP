import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/actions/category/category'
import { AtSearchBar } from 'taro-ui'
import Right from '../../components/category/right';
import { ScrollView } from '@tarojs/components';
import './category.scss'
import Taro, { switchTab } from '@tarojs/taro';

const Category = () => {

  const dispatch = useDispatch()
  const [value, setvalue] = useState('')

  const cate = useSelector((state: any) => state.category.cate)
  const [active, setActive] = useState<number>(0)

  let change = (t, i) => {
    setActive(i)
  }


  // 输入框
  let onChange = (e) => {
    setvalue(e)
  }
  // 确认搜索
  let comfim = () => {
    Taro.reLaunch({
      url: `/pages/searchResult/searchResult?keyword=${value}`
    })
  }

  useEffect(() => {
    dispatch(getCategory())

    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }, [])

  return (
    <div className='category height-100 '>
      <div className='head'>
        <AtSearchBar
          className='b'
          value={value}
          onChange={onChange}
          onActionClick={comfim}
        />
      </div>
      <div className='flex a-i-fs'>
        {/* 侧边 */}
        <div className='category-left height-100 '>
          <ScrollView
            scrollX
            className='sc'
          >
            {
              cate && cate.map((t, i) => {
                return <div key={i} style={{ whiteSpace: 'nowrap' }}
                  className={`p-10 ${i === active ? 'active' : ''}`} onClick={() => change(t.list, i)}>
                  {t.name}
                </div>
              })
            }
          </ScrollView>
        </div>
        {/* 右边 */}
        {
          cate.length && <Right index={active}></Right>
        }


      </div>
    </div>
  )
}

export default Category
