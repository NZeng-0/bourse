import { Request } from './request'

export function upload(data: FormData) {
  return Request.post({
    url: `/index/file/upload`,
    data,
  })
}
