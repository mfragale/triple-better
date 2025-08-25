"use server";

import { httpClient } from "~/triplit/http-client";
import { Account } from "~/triplit/schema";

export async function getAccount(userId: string, providerId: string) {
  const query = httpClient.query("accounts").Where([
    ["userId", "=", userId],
    ["providerId", "=", providerId],
  ]);

  console.log("userId in getAccount action: ", userId);
  console.log("providerId in getAccount action: ", providerId);

  const account = await httpClient.fetchOne(query);

  console.log("account in getAccount action: ", account);

  // await new Promise((resolve) => setTimeout(resolve, 10000));

  return account;
}

export async function updateAccount(
  { accountId }: { accountId: string },
  data: Partial<Account>
) {
  // console.log("data: ", data);

  const updatedAccount = await httpClient.update("accounts", accountId, data);

  return updatedAccount;
}
