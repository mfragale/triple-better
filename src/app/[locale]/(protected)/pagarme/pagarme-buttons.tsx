"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  createPagarmeCustomer,
  createPagarmePaymentLink,
} from "./pagarme-actions";

export function PagarmeButtonsNewClient() {
  const [paymentLink, setPaymentLink] = useState<any>(null);
  const [pagarmeCustomer, setPagarmeCustomer] = useState<any>(null);

  return (
    <div className="flex gap-4 w-full">
      <div className="bg-gray-700 p-4 rounded-md grow-1">
        <h1>New Pagarme Customer</h1>
        <form
          action={async () => {
            try {
              const result = await createPagarmeCustomer();
              setPagarmeCustomer(result);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Button type="submit">New Pagarme Customer</Button>
        </form>
        <pre>{JSON.stringify(pagarmeCustomer, null, 2)}</pre>
      </div>
      <div className="bg-gray-700 p-4 rounded-md grow-1">
        <h1>New Payment Link</h1>
        <form
          action={async () => {
            try {
              const result = await createPagarmePaymentLink(
                pagarmeCustomer?.id
              );
              setPaymentLink(result);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Button type="submit">New Payment Link</Button>
        </form>
        {paymentLink?.url && (
          <a href={paymentLink?.url} target="_blank">
            <Button>Open Payment Link</Button>
          </a>
        )}
        <pre>{JSON.stringify(paymentLink, null, 2)}</pre>
      </div>
    </div>
  );
}
