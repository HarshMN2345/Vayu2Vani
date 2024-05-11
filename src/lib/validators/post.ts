import {z} from 'zod'
export const PostValidator=z.object({
    title:z.string().min(3,{message:'Title 3 characters se zyada lamba hona chaiye'}).max(128,{message:'Title 128 characters se chota hona chaiye'}),
    subVayuId:z.string(),
    content:z.any(),
})
export type PostCreationRequest=z.infer<typeof PostValidator>