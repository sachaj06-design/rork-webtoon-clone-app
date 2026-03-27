import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  User, 
  Coins, 
  Settings, 
  Bell, 
  HelpCircle, 
  Info, 
  ChevronRight,
  Gift,
  MessageCircle,
  Star,
  Shield,
} from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userState } = useUser();

  const handleMenuItemPress = (label: string) => {
    switch (label) {
      case 'Obtenir des Coins':
        Alert.alert('Coins', 'Achetez des Coins pour débloquer des épisodes premium !');
        break;
      case 'Notifications':
        Alert.alert('Notifications', 'Gérez vos préférences de notifications dans les paramètres.');
        break;
      case "Noter l'app":
        Alert.alert('Merci !', 'Nous apprécions votre soutien. Redirection vers le store...');
        break;
      case 'Nous contacter':
        Alert.alert(
          'Nous contacter',
          'Email: support@webtoon-clone.com\n\nNous répondons sous 24h !'
        );
        break;
      case 'Aide':
        Alert.alert(
          'Aide',
          'Consultez notre FAQ pour trouver des réponses aux questions fréquentes.'
        );
        break;
      case 'Confidentialité':
        Alert.alert(
          'Politique de confidentialité',
          'Nous respectons votre vie privée. Vos données sont sécurisées et jamais partagées avec des tiers.'
        );
        break;
      case 'À propos':
        Alert.alert('WEBTOON Clone', 'Version 2.0.0\n\n© 2026 Tous droits réservés');
        break;
      case 'Mes Coins':
        Alert.alert('Mes Coins', `Vous avez ${userState.coinsBalance} Coins disponibles.`);
        break;
      default:
        console.log('Menu item clicked:', label);
    }
  };

  const menuSections = [
    {
      title: 'Mon compte',
      items: [
        { icon: User, label: 'Profil', subtitle: 'Gérer mon compte', route: '/profile' },
        { icon: Coins, label: 'Mes Coins', subtitle: `${userState.coinsBalance} Coins`, highlight: true },
        { icon: Gift, label: 'Obtenir des Coins', subtitle: 'Offres et bonus' },
      ],
    },
    {
      title: 'Préférences',
      items: [
        { icon: Bell, label: 'Notifications', subtitle: 'Paramètres des alertes' },
        { icon: Settings, label: 'Paramètres', subtitle: 'App et lecture', route: '/settings' },
      ],
    },
    {
      title: 'Communauté',
      items: [
        { icon: Star, label: 'Noter l\'app', subtitle: 'Donnez-nous 5 étoiles ⭐' },
        { icon: MessageCircle, label: 'Nous contacter', subtitle: 'Support et feedback' },
      ],
    },
    {
      title: 'À propos',
      items: [
        { icon: HelpCircle, label: 'Aide', subtitle: 'FAQ et guides' },
        { icon: Shield, label: 'Confidentialité', subtitle: 'Politique de données' },
        { icon: Info, label: 'À propos', subtitle: 'Version 2.0.0' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Plus</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color={Colors.text.white} />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Utilisateur WEBTOON</Text>
            <Text style={styles.profileEmail}>Se connecter pour plus de fonctionnalités</Text>
          </View>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Connexion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.coinsCard}>
          <View style={styles.coinsInfo}>
            <Coins size={24} color={Colors.brand.green} />
            <View style={styles.coinsText}>
              <Text style={styles.coinsLabel}>Mes Coins</Text>
              <Text style={styles.coinsValue}>{userState.coinsBalance}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.coinsButton}
            onPress={() => console.log('Recharge coins')}
          >
            <Text style={styles.coinsButtonText}>+ Recharger</Text>
          </TouchableOpacity>
        </View>

        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  activeOpacity={0.6}
                  onPress={() => {
                    if ('route' in item && item.route) {
                      router.push(item.route as any);
                    } else {
                      handleMenuItemPress(item.label);
                    }
                  }}
                >
                  <View style={[styles.menuIconContainer, item.highlight && styles.menuIconHighlight]}>
                    <item.icon size={20} color={item.highlight ? Colors.brand.green : Colors.text.secondary} />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={18} color={Colors.text.muted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footer}>WEBTOON Clone © 2026</Text>
        <View style={{ height: 120 }} />
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: Colors.background.main,
  },
  headerTitle: {
    ...typography.h1Hero,
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.main,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.h3Title,
  },
  profileEmail: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  loginButton: {
    backgroundColor: Colors.brand.green,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  loginButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.white,
  },
  coinsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.main,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  coinsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  coinsText: {},
  coinsLabel: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
  },
  coinsValue: {
    ...typography.h2Section,
    color: Colors.brand.green,
  },
  coinsButton: {
    backgroundColor: 'rgba(0, 220, 100, 0.15)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  coinsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.brand.green,
  },
  menuSection: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  menuSectionTitle: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuIconHighlight: {
    backgroundColor: 'rgba(0, 220, 100, 0.1)',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemLabel: {
    ...typography.bodyRegular,
    fontWeight: '500',
  },
  menuItemSubtitle: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  footer: {
    ...typography.captionMeta,
    color: Colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
