import { Post, User,SubVani,User,Comment} from "@prisma/client";

export type ExtendedPost=Post&{
    votes:Vote[]
    author:User
    comments:Comment[]
    subVani?: SubVani;
}