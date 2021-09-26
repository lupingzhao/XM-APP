export interface Banner {
  isShow: boolean
  link: string
  title: string
  url: string
  _id: string
}
export interface Nav {
  isShow: boolean
  title: string
  url: string
  _id: string
}
export interface Good {
  category: string
  comment: any[]
  company: string
  cover: string
  create_time: string
  detail: string
  discount: string[]
  introduction: string
  isHot: boolean
  isNewGood: boolean
  isRecommend: boolean
  isShow: boolean
  name: string
  originalPrice: string
  params: any[]
  pic: string[]
  presentPrice: string
  productionDesc: string[]
  sellDesc: string[]
  spec: any
  specParams: string
  stock: string
  video: string[]
  _id: string
  selectedList: []
}