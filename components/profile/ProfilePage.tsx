import { View } from 'react-native';

import { useAuth } from '@/lib/context/AuthContext';
import PageTitle from '@components/common/PageTitle';
import CommonUserProfileDetails from './CommonUserProfileDetails';
import AllUserRostersList from './AllUserRostersList';
import Button from '@components/common/forms/Button';
import Spacer from '@components/common/Spacer';

export default function ProfilePage() {
  const { authState, logout } = useAuth();
  const activeUser = authState?.activeUser;
  if (!activeUser) return null;

  return (
    <>
      <PageTitle
        text="Profile"
      />
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1,  width: '100%'}}>
        <View>
          <CommonUserProfileDetails user={activeUser} />
          <Spacer />
          <AllUserRostersList />
        </View>

        <View style={{display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <View style={{width: '48%'}}>
            <Button
              title="Edit Profile"
              onPress={ () => {
                console.log('TODO - edit profile');
              } }
            />
          </View>
          <View style={{width: '48%'}}>
            <Button
              title="Logout"
              theme="secondary"
              onPress={logout}
            />
          </View>
        </View>
      </View>
    </>

  );
}