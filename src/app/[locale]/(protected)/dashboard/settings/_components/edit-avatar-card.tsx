"use client";

import { useState } from "react";

import { UploadDropzone } from "@uploadthing/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { deleteUTFiles } from "@/actions/uploadthing/route";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default function EditAvatarCard(props: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("EditAvatarCard");
  const router = useRouter();

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-start gap-10">
          <div className="space-y-2">
            <CardTitle className="font-semibold text-xl">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("description")}
            </CardDescription>
          </div>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Avatar className="ring-4 w-16 h-16 ring-accent-foreground/20 hover:ring-accent-foreground/40 cursor-pointer">
                {props.session?.user.image ?? (
                  <AvatarImage
                    src={`${props.session?.user.image}`}
                    alt={`${props.session?.user.name}`}
                  />
                )}
                <AvatarFallback>
                  {props.session?.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogCancel className="top-4 right-4 absolute rounded-sm">
                <X className="w-4 h-4" />
                <span className="sr-only">{t("close")}</span>
              </AlertDialogCancel>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("chooseProfileImage")}</AlertDialogTitle>

                <UploadDropzone<OurFileRouter, "imageUploader">
                  className="p-4 border-2 border-indigo-900 border-dashed rounded-md"
                  endpoint="imageUploader"
                  // onChange={(acceptedFiles) => {
                  //   // Do something with the accepted files
                  //   // console.log("Accepted files: ", acceptedFiles);
                  // }}
                  onBeforeUploadBegin={async (files) => {
                    // console.log("Will upload", files.length, "files");
                    if (props.session?.user.image) {
                      // We can pass the image URL to deleteUTFiles because in the delete function we are extracting the file key from the url
                      await deleteUTFiles([props.session?.user.image]);
                      // console.log("Deleted old image");
                    }
                    return files;
                  }}
                  config={{
                    mode: "auto",
                  }}
                  // onUploadBegin={(name) => {
                  //   // Do something once upload begins
                  //   // console.log("Beginning upload of", name);
                  // }}
                  // onUploadProgress={(p) => {
                  //   // console.log("onUploadProgress", p);
                  // }}
                  onClientUploadComplete={async (res) => {
                    // console.log(
                    //   "Upload Completed.",
                    //   res.length,
                    //   "files uploaded"
                    // );
                    await authClient.updateUser({ image: res[0].ufsUrl });
                    // console.log("Updated user image: ", res[0].ufsUrl);
                    setIsOpen(false);
                    router.refresh();
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(
                      t("uploadFailed", { errorMessage: error.message })
                    );
                  }}
                  // appearance={{
                  //   button:
                  //     "ut-ready:cursor-pointer ut-ready:bg-accent-foreground ut-uploading:cursor-not-allowed ut-uploading:bg-muted ut-uploading:text-muted-foreground px-6",
                  // }}
                />
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
