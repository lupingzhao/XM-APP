import React from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'



const Evaluate = () => {
  const province = ''
  const city = ''
  const area = ''
  let onChange = () => {

  }
  const region = ['请选择', '请选择', '请选择']
  let columnChange = () => {

  }

  let ranges = [[], [], []]

  return (
    <div className='p-15'>
      测试页面

      {/* <Picker mode='multiSelector' value={[]} range={ranges} onChange={onChange}
        onColumnChange={columnChange}>
        <View>
          {province && <View>{province} {city} {area}</View>}
          {!province && <View>请选择地区</View>}
          <View>jjjjj</View>
        </View>
      </Picker> */}

    </div>
  )
}

export default Evaluate
