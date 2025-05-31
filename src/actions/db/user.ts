import { triplit } from "../../../triplit/client";
import { Account } from "../../../triplit/schema";

export async function getAccount(userId: string, providerId: string) {
  const query = triplit.query("accounts").Where([
    ["userId", "=", userId],
    ["providerId", "=", providerId],
  ]);
  const account = await triplit.fetchOne(query);

  // console.log("account: ", account);

  return account;
}

export async function updateAccount(
  { accountId }: { accountId: string },
  data: Partial<Account>
) {
  // console.log("data: ", data);

  const updatedAccount = await triplit.update("accounts", accountId, data);

  return updatedAccount;
}
