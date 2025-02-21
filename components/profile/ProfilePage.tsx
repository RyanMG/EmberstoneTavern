import { useAuth } from '@/lib/context/AuthContext';
import PageTitle from '@components/common/PageTitle';
import ProfileImage from './ProfileImage';
import Button from '@components/common/forms/Button';
import Spacer from '@components/common/Spacer';
import Colors from '@/lib/constants/Colors';
import { View, Text } from 'react-native';

export default function ProfilePage() {
  const { authState, logout } = useAuth();
  const activeUser = authState?.activeUser;

  return (
    <>
      <PageTitle
        text="Profile"
      />
      <View style={{display: 'flex', flexDirection: 'column', flex: 1,  width: '100%'}}>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
          <ProfileImage image={activeUser?.profileImage} />
          <Spacer />

          <Text style={{fontSize: 24, color: Colors.TEXT.BASE}}>{activeUser?.firstName} {activeUser?.lastName}</Text>
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