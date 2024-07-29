export type UserModule = (ctx: any) => void

export interface FeatchParams {
  url: string
  params?: Record<string, any>
  data?: Record<string, any>
}
