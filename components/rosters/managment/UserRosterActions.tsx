import { View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRoster } from '@api/rosterApi';
import Button from '@components/common/forms/Button';
import { useRouter } from 'expo-router';

export default function UserRosterActions({
  rosterId,
  campaignId
}: {
  rosterId: string;
  campaignId: string;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteRosterMutation = useMutation({
    mutationFn: deleteRoster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaignRoster', {rosterId}] });
      router.replace(`/(tabs)/campaigns/${campaignId}`);
    }
  })

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10, width: '100%', marginTop: 5}}>
      <Button
        title="Edit Roster Details"
        onPress={() => {
          router.push(`/(tabs)/campaigns/${campaignId}/rosters/${rosterId}/edit`);
        }}
      />
      <Button
        title="Delete Roster"
        theme="destroy"
        onPress={() => deleteRosterMutation.mutate(rosterId)}
      />
    </View>
  );
}
