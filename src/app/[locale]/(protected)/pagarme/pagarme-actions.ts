"use server";

import { env } from "@/env/server";

export async function createPagarmeCustomer() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(env.PAGARME_CHAVE_SECRETA + ":").toString("base64"),
    },
    body: JSON.stringify({
      name: "Aaron Doe" + Math.random().toString(),
      email: "aaron.doe" + Math.random().toString() + "@example.com",
      address: {
        country: "BR",
        state: "RJ",
        city: "Rio de Janeiro",
        zip_code: "20021130",
        line_1: "375, Av. General Justo, Centro",
        line_2: "8º andar",
      },
      phones: {
        mobile_phone: {
          country_code: "55",
          area_code: "21",
          number: "000000000",
        },
      },
      birthdate: "05/31/1984",
      code: "BETTER_AUTH_USER_ID",
      document: "93095135270",
      document_type: "CPF",
      type: "individual",
      gender: "male",
    }),
  };

  try {
    const response = await fetch(
      "https://api.pagar.me/core/v5/customers",
      options
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createPagarmePaymentLink(pagarmeCustomerId: string) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Basic c2tfdGVzdF81ZjJhYjlmZGQxNmQ0NmYxYjFmMGMzNGFmNTYzYTNjNjo=",
    },
    body: JSON.stringify({
      is_building: false,
      payment_settings: {
        credit_card_settings: {
          installments_setup: {
            interest_type: "simple",
            max_installments: 10,
            amount: 9900,
            interest_rate: 10,
            free_installments: 6,
          },
          operation_type: "auth_and_capture",
        },
        boleto_settings: {
          due_in: 3,
          instructions: "Favor pagar o boleto em até 3 dias.",
        },
        pix_settings: { expires_in: 2, discount_percentage: 5 },
        accepted_payment_methods: ["credit_card", "pix", "boleto"],
        statement_descriptor: "Triple Better",
      },
      customer_settings: { customer_id: pagarmeCustomerId },
      cart_settings: {
        items: [
          {
            name: "Produto 01",
            description: "A great product",
            amount: 9999,
            default_quantity: 1,
          },
        ],
      },
      layout_settings: {
        image_url:
          "https://triple-better.vercel.app/_next/image?url=%2Ficon-circle.png&w=64&q=75",
        primary_color: "#000000",
        secondary_color: "#333333",
      },
      name: "Product 1",
      type: "order",
      max_paid_sessions: 1,
    }),
  };

  try {
    const response = await fetch(
      "https://sdx-api.pagar.me/core/v5/paymentlinks",
      options
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
