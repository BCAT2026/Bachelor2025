import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

function TabIcon({ focused, children }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      {children}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: styles.tabIcon,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopWidth: 1,
            borderTopColor: '#D9E0DC',
          },
          default: {
            borderTopWidth: 1,
            borderTopColor: '#D9E0DC',
            backgroundColor: '#FFFFFF',
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('HOME'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
                accessibilityRole="button"
              />
            </TabIcon>
          ),
        }}
      />
      
      <Tabs.Screen
  name="guidelines"
  options={{
    title: t('GUIDELINES'),
    tabBarIcon: ({ focused }) => (
      <TabIcon focused={focused}>
        <Image
          source={
            focused
              ? require('../../assets/images/retningslinjer_ikon1.png')
              : require('../../assets/images/retningslinjer_ikon2.png')
          }
          style={styles.guidelineIcon}
          resizeMode="contain"
          accessibilityRole="button"
        />
      </TabIcon>
    ),
  }}
/>
      <Tabs.Screen
        name="decisionTreePage"
        options={{
          title: "BCAT",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Ionicons
                name={focused ? "git-branch" : "git-branch-outline"}
                size={24}
                color={color}
                accessibilityRole="button"
              />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('MORE'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Ionicons
                name={focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline"}
                size={24}
                color={color}
                accessibilityRole="button"
              />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen 
    name="swipeTips" 
    options={{ 
      href: null,  // Vises ikke i tab-baren
      headerShown: false // Fjerner header på toppen
    }}
  />
  <Tabs.Screen 
    name="iconTips" 
    options={{ 
      href: null,  // Vises ikke i tab-baren
      headerShown: false // Fjerner header på toppen
    }} 
  />
      
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 2,
  },
  tabIcon: {
    marginTop: 2,
  },
  tabLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    lineHeight: 13,
    marginTop: 1,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#E8F2EA',
  },
  guidelineIcon: {
    width: 23,
    height: 23,
  },
});
