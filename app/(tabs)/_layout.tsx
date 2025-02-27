import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from 'expo-router';
import Colors from '@/lib/constants/colors';
import { useAuth } from '@/lib/context/AuthContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { authState } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.TABS.ACTIVE,
        tabBarInactiveTintColor: Colors.TABS.BASE,
        tabBarStyle: {
          backgroundColor: Colors.BACKGROUND.GREEN,
          borderTopColor: Colors.BORDER.BASE,
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
          href: authState?.authenticated ? '/(tabs)/campaigns' : null,
          tabBarIcon: ({ color }) => <TabBarIcon name="sitemap" color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          href: '/(tabs)/profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
    </Tabs>
  );
}
