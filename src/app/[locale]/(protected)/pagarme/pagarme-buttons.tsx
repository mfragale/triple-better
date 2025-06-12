"use client";

import { Button } from "@/components/ui/button";
import { PagarmeCustomer, PagarmePaymentLink } from "@/types";
import to from "await-to-js";
import { useState } from "react";
import {
  createPagarmeCustomer,
  createPagarmePaymentLink,
} from "./pagarme-actions";

export function PagarmeButtonsNewClient() {
  const [paymentLink, setPaymentLink] = useState<PagarmePaymentLink | null>(
    null
  );
  const [pagarmeCustomer, setPagarmeCustomer] =
    useState<PagarmeCustomer | null>(null);

  return (
    <div className="flex gap-4 w-full">
      <div className="bg-gray-700 p-4 rounded-md grow-1">
        <h1>{"New Pagarme Customer"}</h1>
        <form
          action={async () => {
            const [err, pagarmeCustomerResponse] = await to(
              createPagarmeCustomer()
            );
            if (!pagarmeCustomerResponse) {
              console.error(err);
              throw Error("Pagarme Customer not found");
            }
            setPagarmeCustomer(pagarmeCustomerResponse);
          }}
        >
          <Button type="submit">{"New Pagarme Customer"}</Button>
        </form>
        <pre>{JSON.stringify(pagarmeCustomer, null, 2)}</pre>
      </div>
      <div className="bg-gray-700 p-4 rounded-md grow-1">
        <h1>{"New Payment Link"}</h1>
        <form
          action={async () => {
            const [err, pagarmePaymentLinkResponse] = await to(
              createPagarmePaymentLink(pagarmeCustomer?.id || "")
            );
            if (!pagarmePaymentLinkResponse) {
              console.error(err);
              throw Error("Pagarme Payment Link not found");
            }
            setPaymentLink(pagarmePaymentLinkResponse);
          }}
        >
          <Button type="submit">{"New Payment Link"}</Button>
        </form>
        {paymentLink?.url && (
          <a href={paymentLink?.url} target="_blank">
            <Button>{"Open Payment Link"}</Button>
          </a>
        )}
        <pre>{JSON.stringify(paymentLink, null, 2)}</pre>
      </div>
    </div>
  );
}
