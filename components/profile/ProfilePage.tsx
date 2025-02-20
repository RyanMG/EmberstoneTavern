import { useAuth } from '@context/AuthContext';
import PageTitle from '@components/common/PageTitle';
import ProfileImage from './ProfileImage';
import Button from '@components/common/forms/Button';
import Spacer from '@components/common/Spacer';
import Colors from '@/constants/Colors';
import { View, Text } from 'react-native';

export default function ProfilePage() {
  const { getActiveUser, logout } = useAuth();
  const user = getActiveUser();

  return (
    <>
      <PageTitle
        text="Profile"
      />
      <View style={{display: 'flex', flexDirection: 'column', flex: 1,  width: '100%'}}>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
          <ProfileImage image={user?.profileImage} />
          <Spacer />

          <Text style={{fontSize: 24, color: Colors.TEXT.BASE}}>{user?.firstName} {user?.lastName}</Text>
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