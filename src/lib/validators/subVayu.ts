import {z} from 'zod'
export const SubVayuValidator=z.object({
    name:z.string().min(3).max(21),
})
export const SubVayuSubscriptionValidator=z.object({
    subVayuId:z.string()
})
export type CreateSubVayuPayload=z.infer<typeof SubVayuValidator>
export type SubscribeToSubVayuPayload=z.infer<typeof SubVayuSubscriptionValidator>