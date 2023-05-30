import http from "@/utils/http"

// 详情页数据
export const getDetail = (id) => {
  return http({
    url: '/goods',
    params: {
      id
    }
  })
}