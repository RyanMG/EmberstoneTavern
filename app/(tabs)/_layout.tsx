import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.TABS_ACTIVE,
        tabBarStyle: {
          backgroundColor: Colors.BG_LIGHTEN
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tavern',
          tabBarIcon: ({ color }) => <TabBarIcon name="beer" color={color} />
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Campaigns',
          tabBarIcon: ({ color }) => <TabBarIcon name="sitemap" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
    </Tabs>
  );
}
