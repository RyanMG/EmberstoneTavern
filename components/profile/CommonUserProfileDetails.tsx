import { View } from 'react-native';
import BodyText from '@/components/common/text/BodyText';
import ProfileImage from '@components/profile/ProfileImage';
import Spacer from '@components/common/Spacer';

import { TPerson } from '@definitions/person'

export default function CommonUserProfileDetails({
  user
}: {
  user: TPerson
}) {
  return (
    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
      <ProfileImage image={user?.profileImage} />
      <Spacer />

      <BodyText textSize="xl" bold={true}>{user?.firstName} {user?.lastName}</BodyText>
    </View>
  )
}
