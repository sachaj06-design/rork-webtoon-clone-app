import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';
import { genres, seriesData, formatNumber } from '@/mocks/webtoonData';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function GenresScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const getSeriesByGenre = (genreId: string) => {
    return seriesData.filter(s => s.genre.toLowerCase() === genreId.toLowerCase()).slice(0, 3);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Genres</Text>
        <Text style={styles.headerSubtitle}>Découvrez par catégorie</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.genreGrid}>
          {genres.map((genre) => {
            const genreSeries = getSeriesByGenre(genre.id);
            return (
              <TouchableOpacity
                key={genre.id}
                style={styles.genreCard}
                activeOpacity={0.7}
                onPress={() => router.push(`/genre/${genre.id}`)}
              >
                <View style={styles.genreHeader}>
                  <View style={styles.genreIconContainer}>
                    <Text style={styles.genreIcon}>{genre.icon}</Text>
                  </View>
                  <View style={styles.genreInfo}>
                    <Text style={styles.genreName}>{genre.name}</Text>
                    <Text style={styles.genreCount}>{formatNumber(genre.count)} séries</Text>
                  </View>
                  <ChevronRight size={20} color={Colors.text.secondary} />
                </View>
                
                {genreSeries.length > 0 && (
                  <View style={styles.genrePreview}>
                    {genreSeries.map((series) => (
                      <TouchableOpacity
                        key={series.id}
                        style={styles.previewItem}
                        onPress={() => router.push(`/series/${series.id}`)}
                      >
                        <Image
                          source={{ uri: series.thumbnailUrl }}
                          style={styles.previewImage}
                          contentFit="cover"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: Colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    ...typography.h1Hero,
    fontSize: 28,
  },
  headerSubtitle: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  genreGrid: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  genreCard: {
    backgroundColor: Colors.background.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  genreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreIcon: {
    fontSize: 22,
  },
  genreInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  genreName: {
    ...typography.h3Title,
  },
  genreCount: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  genrePreview: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  previewItem: {
    width: 60,
    height: 80,
    borderRadius: 4,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
