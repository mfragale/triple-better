"use server";

export async function acceptSchedule(
  acceptLink: string,
  pcoAccessToken: string
) {
  try {
    const response = await fetch(`${acceptLink}/accept`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pcoAccessToken}`,
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error accepting schedule:", error);
    return { success: false };
  }
}
