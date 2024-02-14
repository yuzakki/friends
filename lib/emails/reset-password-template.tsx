import {
  Body,
  Container,
  Head,
  Heading,
  Tailwind,
  Html,
  Section,
  Button,
  Preview,
  Hr,
  Text,
  Link,
} from '@react-email/components';

interface Props {
  name: string;
  resetURL: string;
}

export function RPEmailHTML({ name, resetURL }: Props): JSX.Element {
  return (
    <Html>
      <Head />
      <Preview>Password Reset Notification</Preview>

      <Tailwind>
        <Body
          style={{
            backgroundColor: '#f6f9fc',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          <Container
            style={{
              backgroundColor: '#fff',
              padding: '20px 0 48px',
              marginBottom: '64px',
            }}
          >
            <Section style={{ padding: '0 48px' }}>
              <Heading as="h3">Hello {name},</Heading>

              <Text className="text-base font-normal mb-4 text-left leading-relaxed">
                We received a request to reset your password. Click the link
                below to reset your password:
              </Text>

              <Container className="flex justify-center">
                <Button
                  href={resetURL}
                  className="w-fit block mx-auto mt-[10px] mb-[20px] py-[12px] px-[20px] text-white cursor-pointer"
                  style={{ backgroundColor: '#007bff', borderRadius: '5px' }}
                >
                  Reset Password
                </Button>
              </Container>

              <Container>
                <Text className="text-base font-normal mb-4 text-left leading-relaxed">
                  This password reset link will expire in 10 minutes
                </Text>

                <Text className="text-base font-normal mb-4 text-left leading-relaxed">
                  If you didn&apos;t request a password reset, please ignore
                  this email.
                </Text>
              </Container>

              <Container>
                <Text className="text-base font-normal text-left leading-relaxed">
                  Thank you,
                </Text>
                <Text className="text-base font-normal mb-4 text-left leading-relaxed">
                  - Hassan Azouzout, CEO
                </Text>
              </Container>

              <Hr />

              <Container>
                <Link href={process.env.CLIENT_DOMAIN} className="w-fit block mx-auto">
                  <Text className="mt-3 mb-6 text-gray-500 font-sans text-sm leading-6 text-center">
                    Friends Inc.
                  </Text>
                </Link>
              </Container>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
