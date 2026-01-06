import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Mail, Calendar, Edit2 } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Utilisateur WEBTOON');
  const [email, setEmail] = useState('user@webtoon.com');

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Edit2 size={20} color={Colors.brand.green} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={48} color={Colors.text.white} />
            </View>
            <TouchableOpacity style={styles.avatarEditButton}>
              <Edit2 size={16} color={Colors.text.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <User size={20} color={Colors.text.secondary} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Nom d&apos;utilisateur</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.inputValue}>{username}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Mail size={20} color={Colors.text.secondary} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.inputValue}>{email}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Calendar size={20} color={Colors.text.secondary} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Membre depuis</Text>
              <Text style={styles.inputValue}>Janvier 2026</Text>
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Séries suivies</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Épisodes lus</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Déconnexion</Text>
        </TouchableOpacity>

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
  editButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: Colors.background.main,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.background.main,
  },
  form: {
    backgroundColor: Colors.background.main,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  inputIcon: {
    marginRight: spacing.md,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  inputValue: {
    ...typography.bodyRegular,
    fontWeight: '500' as const,
  },
  input: {
    ...typography.bodyRegular,
    fontWeight: '500' as const,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.brand.green,
  },
  actions: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  saveButton: {
    backgroundColor: Colors.brand.green,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.bodyRegular,
    fontWeight: '700' as const,
    color: Colors.text.white,
  },
  cancelButton: {
    backgroundColor: Colors.background.main,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  cancelButtonText: {
    ...typography.bodyRegular,
    fontWeight: '600' as const,
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2Section,
    color: Colors.brand.green,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  dangerButton: {
    marginHorizontal: spacing.lg,
    backgroundColor: Colors.background.main,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  dangerButtonText: {
    ...typography.bodyRegular,
    fontWeight: '600' as const,
    color: '#FF3B30',
  },
});