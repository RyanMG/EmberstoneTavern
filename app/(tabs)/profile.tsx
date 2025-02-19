import { useAuth } from '@context/AuthContext';
import Login from '@components/auth/Login';
import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';

export default function Profile() {
  const { authState } = useAuth();
  return (
    <PageContainer>
      {authState?.authenticated ? (
        <>
          <PageTitle
            text="Profile"
          />
        </>
      ) : (
        <Login />
      )}
    </PageContainer>
  );
}
