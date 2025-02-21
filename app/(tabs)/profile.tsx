import { useAuth } from '@/lib/context/AuthContext';
import LoginPrompt from '@/components/auth/LoginPrompt';
import PageContainer from '@components/common/PageContainers';
import ProfilePage from '@components/profile/ProfilePage';

export default function Profile() {
  const { authState } = useAuth();
  return (
    <PageContainer>
      {authState?.authenticated ? (
        <ProfilePage />
      ) : (
        <LoginPrompt />
      )}
    </PageContainer>
  );
}
