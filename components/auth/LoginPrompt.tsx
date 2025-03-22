import ContentBox from '@components/common/ContentBox';
import PageTitle from '@components/common/PageTitle';
import BodyText from '@/components/common/text/BodyText';
import Button from '@components/common/forms/Button';
import Spacer from '@components/common/Spacer';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <ContentBox>
      <PageTitle
        text="Login To App"
      />
      <BodyText textSize="sm" italic={true}>
        Creating or joinging campaigns requires you be logged into the application. Register or sign in to continue.
      </BodyText>
      <Spacer />
      <Button
        title="Log In Or Register"
        onPress={() => {
          router.replace('/(auth)/login');
        }}
      />

    </ContentBox>
  );
}
