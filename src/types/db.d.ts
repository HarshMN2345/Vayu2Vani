import { Post, User,SubVani,User,Comment} from "@prisma/client";

export type ExtendedPost=Post&{
    subVayu:SubVani
    votes:Vote[]
    author:User
    comments:Comment[]
}