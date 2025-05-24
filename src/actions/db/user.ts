import { triplitClient } from "../../../triplit/client";
import { Account } from "../../../triplit/schema";

export async function getAccount(userId: string, providerId: string) {
  const query = triplitClient.query("accounts").Where([
    ["userId", "=", userId],
    ["providerId", "=", providerId],
  ]);
  const account = await triplitClient.fetchOne(query); // null

  return account;
}

export async function updateAccount(
  { accountId }: { accountId: string },
  data: Partial<Account>
) {
  // console.log("data: ", data);

  const updatedAccount = await triplitClient.update(
    "accounts",
    accountId,
    data
  );

  //   const [updatedAccount] = await db
  //     // Try to update a user
  //     .update(account)
  //     .set(data)
  //     .where(eq(account.id, accountId))

  //     // Return the newly created user
  //     .returning();

  //   if (updatedAccount == null) {
  //     throw new Error("Failed to update account");
  //   }

  //   revalidateUserCache(updatedAccount.id);

  //   return updatedAccount;
}
