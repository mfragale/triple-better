"use server";

import { UTApi } from "uploadthing/server";

export const deleteUTFiles = async (files: string[]) => {
  try {
    const fileKeys = files.map((file) => {
      // Extract the last part of the URL after the last '/'
      return file.substring(file.lastIndexOf("/") + 1);
    });

    const utapi = new UTApi();
    await utapi.deleteFiles(fileKeys);
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
  }
};

// https://3voonmhvwg.ufs.sh/f/cPQ7ypE7KP02f1qnMgCKc87t6ylxfT09BDaPojOZ1gUAM5hd
// cPQ7ypE7KP02f1qnMgCKc87t6ylxfT09BDaPojOZ1gUAM5hd
