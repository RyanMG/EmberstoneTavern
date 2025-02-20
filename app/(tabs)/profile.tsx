import { useAuth } from '@context/AuthContext';
import Login from '@components/auth/Login';
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
        <Login />
      )}
    </PageContainer>
  );
}
