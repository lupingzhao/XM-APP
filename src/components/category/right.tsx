import React, { useState } from 'react'
import { ScrollView } from '@tarojs/components'
import banner from '../../static/af31685c81d8958069c17b1e40ea2d78.jpg'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro';


interface Props {
  index: any
}
const Right = (props: Props) => {
  const cate = useSelector((state: any) => state.category.cate)
  const [id, setid] = useState<string>('')

  // 滚动到指定位置
  let scroll = (i: number) => {
    setid(`demo${i}`)
  }
  // 去详情
  let goto = (id) => {
    Taro.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }

  return (
    <div className='cate-right p-10'>
      <div className='t-a-c mb-10 width-100'>
        <img src={banner} alt="" className='img' />
      </div>
      <div className='mb-10 ' style={{ width: '70vw' }}>
        <ScrollView
          scrollX className='sc-x' >
          {
            cate && cate[props.index].list.map((t, i) => {
              return <div key={i} className='t-item b-radius-10' onClick={() => scroll(i)}>
                {t.name}
              </div>
            })
          }
        </ScrollView>
      </div>
      <div>
        <ScrollView scrollY={true} scrollIntoView={id} style={{ height: '100vw' }}>
          {
            cate && cate[props.index].list.map((t, i) => {
              return <div key={i} className='g-item mb-10' id={'demo' + i}>
                <div className='m-tb-10'>
                  {t.name}
                </div>
                <div>
                  {
                    t.list ? t.list.map((t1, i1) => {
                      return <div key={i1}>
                        {
                          Object.values(t1).map((t2: any, i2) => {
                            return <div key={i2} className='flex a-i-fs' onClick={() => goto(t2[0]._id)}>
                              <div className='width-30 mr-10'>
                                <img src={t2[0].cover} alt="" className='img' />
                              </div>
                              <div className='width-70'>
                                <div>
                                  {t2[0].name}
                                </div>
                                <div className='m-tb-10'>
                                  {t2[0].introduction}
                                </div>
                              </div>

                            </div>
                          })
                        }
                      </div>
                    })
                      :
                      <div className='m-tb-10 t-a-c'>
                        暂无数据
                      </div>
                  }
                </div>
              </div>
            })
          }
        </ScrollView>
      </div>
    </div>
  )
}

export default Right
