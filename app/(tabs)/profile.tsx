import { useAuth } from '@context/AuthContext';
import LoginPrompt from '@/components/auth/LoginPrompt';
import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import Button from '@components/common/forms/Button';

export default function Profile() {
  const { authState, logout } = useAuth();
  return (
    <PageContainer>
      {authState?.authenticated ? (
        <>
          <PageTitle
            text="Profile"
          />
          <Button
            title="Logout"
            onPress={logout}
          />
        </>
      ) : (
        <LoginPrompt />
      )}
    </PageContainer>
  );
}
