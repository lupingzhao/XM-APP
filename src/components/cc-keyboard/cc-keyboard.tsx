import React, { useState } from 'react'
import './index.scss'

interface Props {
  clickKey?: (item: string) => void,
  backspace?: () => void,
}


const CcKeyboard = (props: Props) => {
  let { clickKey, backspace } = props
  let keyBoardItem = ['1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '0',
    'x'
  ]

  let clickItem = (item: string, index: number) => {
    if (index !== keyBoardItem.length - 1) {
      clickKey && clickKey(item)
    } else {
      backspace && backspace()
    }
  }
  return (

    <div style={{ background: '#fff ' }}>
      <div className='cc-number-keyboard-wrap'>
        <div className='cc-number-keyboard-wrap-content'>
          {
            keyBoardItem.map((item: string, index: number) => {
              return (
                <div className="cc-number-keyboard-wrap-content-item" key={index} onClick={() => clickItem(item, index)}>
                  <div className='cc-number-keyboard-wrap-content-item-key' dangerouslySetInnerHTML={{
                    __html: item
                  }}></div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

CcKeyboard.defaultProps = {
  visible: false
}


export default CcKeyboard
