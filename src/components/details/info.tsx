import React from 'react'
import { AtTabBar } from 'taro-ui'
import { Good } from '../../type/index'
import f from '../../static/1.png'
import s from '../../static/2.png'
import t from '../../static/3.png'
import phb from '../../static/paihang.png'


interface Props {
  details: Good
}

const Info = (props: Props) => {
  const img = [f, s, t]


  return (
    <div className='d-info '>
      <div className='p-10'>
        <div className='flex'>
          <div className='mr-5 j-color font-w-7'>￥{props.details.presentPrice}</div>
          <div className=' del-line'>￥{props.details.originalPrice}</div>
        </div>
        <div className='font-w-7 m-tb-10'>
          {props.details.name}
        </div>
        <div className='mb-10'>
          {props.details.introduction}
        </div>

        {/* 推荐介绍 */}
        <div >
          {
            props.details.sellDesc && props.details.sellDesc[0].split('\n').map((t, i) => {
              return <div key={i} className='flex'>
                <div className='mr-5'>
                  <img src={img[i]} alt="" style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  {t}
                </div>
              </div>
            })
          }
        </div>

      </div>
      {/* 排行榜 */}
      <div className='phb flex jcsb p-10' style={{ backgroundColor: '#FFF3EB' }}>
        <div>
          <img src={phb} alt="" style={{ width: 90, height: 25 }} />
        </div>
        <div>
          &gt;
        </div>
      </div>



    </div>
  )
}

export default Info
