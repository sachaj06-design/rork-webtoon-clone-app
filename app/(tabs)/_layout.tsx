import { Tabs } from "expo-router";
import { Home, Grid3X3, Brush, BookMarked, MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.brand.green,
        tabBarInactiveTintColor: Colors.text.secondary,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "ORIGINALS",
          tabBarIcon: ({ color, focused }) => (
            <Home 
              color={color} 
              size={22} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="genres"
        options={{
          title: "GENRES",
          tabBarIcon: ({ color }) => <Grid3X3 color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="canvas"
        options={{
          title: "CANVAS",
          tabBarIcon: ({ color }) => <Brush color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="my-series"
        options={{
          title: "MES SÉRIES",
          tabBarIcon: ({ color, focused }) => (
            <BookMarked 
              color={color} 
              size={22}
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "PLUS",
          tabBarIcon: ({ color }) => <MoreHorizontal color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background.main,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});
