import { Post,Vote,SubVani,User,Comment} from "@prisma/client";

export type ExtendedPost=Post&{
    votes:Vote[]
    author:User
    comments:Comment[]
    SubVani?: SubVani;
}