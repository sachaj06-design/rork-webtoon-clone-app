import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    console.log(isLogin ? 'Login' : 'Signup', { email, password, username });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isLogin ? 'Connexion' : 'Inscription'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>W</Text>
            </View>
            <Text style={styles.welcomeText}>
              {isLogin ? 'Bienvenue sur WEBTOON' : 'Créez votre compte'}
            </Text>
            <Text style={styles.subtitleText}>
              {isLogin
                ? 'Connectez-vous pour synchroniser vos lectures'
                : 'Rejoignez la communauté WEBTOON'}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nom d&apos;utilisateur</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre pseudo"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  placeholderTextColor={Colors.text.muted}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="votre@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {isLogin ? 'Se connecter' : 'Créer mon compte'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continuer avec Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continuer avec Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.switchButton}>
                {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  closeButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h3Title,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.brand.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '700' as const,
    color: Colors.text.white,
  },
  welcomeText: {
    ...typography.h2Section,
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  subtitleText: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.bodyRegular,
    fontWeight: '600' as const,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: Colors.background.surface,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    ...typography.bodyRegular,
    color: Colors.brand.green,
    fontWeight: '500' as const,
  },
  submitButton: {
    backgroundColor: Colors.brand.green,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  submitButtonText: {
    ...typography.bodyRegular,
    fontWeight: '700' as const,
    color: Colors.text.white,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.light,
  },
  dividerText: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginHorizontal: spacing.md,
  },
  socialButton: {
    backgroundColor: Colors.background.surface,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  socialButtonText: {
    ...typography.bodyRegular,
    fontWeight: '600' as const,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  switchText: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
  },
  switchButton: {
    ...typography.bodyRegular,
    color: Colors.brand.green,
    fontWeight: '700' as const,
  },
});