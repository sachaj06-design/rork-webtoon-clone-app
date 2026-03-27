import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Home } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Home size={64} color={Colors.text.muted} />
        </View>
        <Text style={styles.title}>Page introuvable</Text>
        <Text style={styles.subtitle}>Cette page n&apos;existe pas ou a été déplacée.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Retour à l&apos;accueil</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: Colors.background.main,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1Hero,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  link: {
    marginTop: spacing.xl,
    backgroundColor: Colors.brand.green,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
  },
  linkText: {
    color: Colors.text.white,
    fontWeight: '600',
    fontSize: 15,
  },
});
