import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { env } from "@/env/server";

interface DefaultEmailProps {
  heading?: string;
  text?: string;
}

export const DefaultEmail = ({ heading, text }: DefaultEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white mx-auto my-auto px-2 font-sans">
          <Preview>{"Preview"}</Preview>
          <Container className="mx-auto my-[40px] p-[20px] border border-[#eaeaea] border-solid rounded max-w-[465px]">
            <Section className="my-[32px]">
              <Img
                src={`${env.BETTER_AUTH_URL}/icon.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="font-semibold text-[24px] text-black">
              {heading}
            </Heading>
            <Text className="text-[#666666] text-[16px] leading-[26px]">
              {text}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

DefaultEmail.PreviewProps = {
  heading: "Welcome to our service!",
  text: "If you have any questions, please don't hesitate to reach out to us.",
} as DefaultEmailProps;

export default DefaultEmail;
