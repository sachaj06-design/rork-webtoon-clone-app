import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [autoPlay, setAutoPlay] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dataMode, setDataMode] = useState(false);

  const handleButtonPress = (label: string) => {
    switch (label) {
      case 'Qualité des images':
        Alert.alert(
          'Qualité des images',
          'Sélectionnez la qualité d\'affichage',
          [
            { text: 'Basse', onPress: () => console.log('Basse') },
            { text: 'Moyenne', onPress: () => console.log('Moyenne') },
            { text: 'Haute', onPress: () => console.log('Haute'), style: 'default' },
          ]
        );
        break;
      case 'Nouveaux épisodes':
        Alert.alert(
          'Notifications des épisodes',
          'Choisissez les séries pour lesquelles vous souhaitez recevoir des notifications.'
        );
        break;
      case 'Langue':
        Alert.alert(
          'Langue',
          'Sélectionnez votre langue',
          [
            { text: 'Français', onPress: () => console.log('Français'), style: 'default' },
            { text: 'English', onPress: () => console.log('English') },
            { text: 'Español', onPress: () => console.log('Español') },
          ]
        );
        break;
      case 'Thème':
        Alert.alert(
          'Thème',
          'Sélectionnez le thème de l\'application',
          [
            { text: 'Clair', onPress: () => console.log('Clair'), style: 'default' },
            { text: 'Sombre', onPress: () => console.log('Sombre') },
            { text: 'Auto', onPress: () => console.log('Auto') },
          ]
        );
        break;
      case 'Effacer le cache':
        Alert.alert(
          'Effacer le cache',
          'Êtes-vous sûr de vouloir effacer le cache ? Cela libérera de l\'espace de stockage.',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Effacer', onPress: () => Alert.alert('Cache effacé', 'Le cache a été vidé avec succès.'), style: 'destructive' },
          ]
        );
        break;
    }
  };

  const settingsSections = [
    {
      title: 'Lecture',
      items: [
        { 
          label: 'Lecture automatique', 
          subtitle: 'Passer automatiquement à l\'épisode suivant',
          type: 'toggle' as const,
          value: autoPlay,
          onToggle: setAutoPlay,
        },
        { 
          label: 'Mode données', 
          subtitle: 'Économiser les données mobiles',
          type: 'toggle' as const,
          value: dataMode,
          onToggle: setDataMode,
        },
        { 
          label: 'Qualité des images', 
          subtitle: 'Haute',
          type: 'button' as const,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { 
          label: 'Notifications', 
          subtitle: 'Activer toutes les notifications',
          type: 'toggle' as const,
          value: notifications,
          onToggle: setNotifications,
        },
        { 
          label: 'Nouveaux épisodes', 
          subtitle: 'Recevoir une alerte pour chaque série',
          type: 'button' as const,
        },
      ],
    },
    {
      title: 'Général',
      items: [
        { 
          label: 'Langue', 
          subtitle: 'Français',
          type: 'button' as const,
        },
        { 
          label: 'Thème', 
          subtitle: 'Clair',
          type: 'button' as const,
        },
      ],
    },
    {
      title: 'Stockage',
      items: [
        { 
          label: 'Effacer le cache', 
          subtitle: '0 MB',
          type: 'button' as const,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                >
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ 
                        false: Colors.text.muted, 
                        true: Colors.brand.green 
                      }}
                      thumbColor={Colors.background.main}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => handleButtonPress(item.label)}>
                      <ChevronRight size={20} color={Colors.text.secondary} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: Colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h3Title,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    ...typography.bodyRegular,
    fontWeight: '500' as const,
    marginBottom: 2,
  },
  settingSubtitle: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
  },
});
