import { getIndexProduct } from '~/api'
import router from '~/router'

export async function getProduct() {
  const { data } = await getIndexProduct()
  if (data.value.code !== 200)
    router.push('/login')
  return data.value.data
}
