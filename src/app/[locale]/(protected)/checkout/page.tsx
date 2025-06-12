import { useTranslations } from "next-intl";
import StripeCheckoutForm from "./_components/stripe-checkout-form";

export default function CheckoutPage() {
  const t = useTranslations("CheckoutPage");

  return (
    <div>
      {t("title")}
      <StripeCheckoutForm
        product={{
          priceInCurrency: 100,
          name: "Test Product",
          id: "123",
          imageUrl:
            "https://images.unsplash.com/photo-1608880619984-49d0ad6e70a4?q=80&w=2604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Test Description",
        }}
        user={{
          email: "test@test.com",
          id: "123",
        }}
      />
    </div>
  );
}
