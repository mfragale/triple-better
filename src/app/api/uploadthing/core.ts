import { auth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { UTFiles, createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { User } from "../../../../triplit/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ files }) => {
      // This code runs on your server before upload
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user as User | undefined;

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // (Optional) Label your files with a custom identifier
      const filesWithMyIds = files.map((file, idx) => ({
        ...file,
        customId: `${idx}-${randomUUID()}`,
      }));

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // Return some metadata to be stored with the file
      return { userId: user.id, [UTFiles]: filesWithMyIds };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
