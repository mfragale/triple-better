import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

// import { env } from "@/env/server";

interface DefaultEmailProps {
  heading: string;
  text: string;
}

export const DefaultEmail = ({ heading, text }: DefaultEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white mx-auto my-auto px-2 font-sans">
          <Preview>{text}</Preview>
          <Container className="mx-auto my-10 p-8 border border-gray-200 border-solid rounded-xl max-w-96">
            {/* HEADER */}
            <Heading className="font-semibold text-gray-700 text-2xl">
              {heading}
            </Heading>

            {/* BODY */}
            <Text className="text-gray-500 text-base">{text}</Text>

            {/* FOOTER */}
            <Section className="mt-12">
              <table className="w-full">
                <tr className="w-full">
                  <td>
                    {/* eslint-disable-next-line n/no-process-env */}
                    <Link href={process.env.DEPLOYED_URL}>
                      <Img
                        // eslint-disable-next-line n/no-process-env
                        src={`${process.env.DEPLOYED_URL}/icon.png`}
                        width="40"
                        height="40"
                        // eslint-disable-next-line n/no-process-env
                        alt={process.env.APP_NAME}
                      />
                    </Link>
                  </td>
                </tr>
                <tr className="w-full">
                  <td>
                    <Text className="my-1 font-semibold text-gray-900 text-base">
                      {/* eslint-disable-next-line n/no-process-env */}
                      {process.env.APP_NAME}
                    </Text>
                    <Text className="my-0 text-gray-500 text-xs">
                      {/* eslint-disable-next-line n/no-process-env */}
                      {process.env.APP_DESCRIPTION}
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
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
