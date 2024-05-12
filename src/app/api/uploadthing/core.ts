import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getToken } from 'next-auth/jwt'
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    
    .middleware(async ({ req }) => {
      
      const user = await getToken({ req })
 
      
      if (!user) throw new UploadThingError("Unauthorized");
 
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
  } satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter;