import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors, { spacing, typography } from '@/constants/colors';
import { genres, seriesData, formatNumber } from '@/mocks/webtoonData';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function GenresScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const getSeriesByGenre = (genreId: string) => {
    return seriesData.filter(s => s.genre.toLowerCase() === genreId.toLowerCase());
  };

  const getGenreCoverImage = (genreId: string) => {
    const genreSeries = getSeriesByGenre(genreId);
    if (genreSeries.length > 0) {
      return genreSeries[0].bannerUrl;
    }
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop';
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
            const coverImage = getGenreCoverImage(genre.id);
            
            return (
              <TouchableOpacity
                key={genre.id}
                style={styles.genreCard}
                activeOpacity={0.8}
                onPress={() => router.push(`/genre/${genre.id}`)}
              >
                <Image
                  source={{ uri: coverImage }}
                  style={styles.genreBackground}
                  contentFit="cover"
                />
                <View style={styles.genreOverlay}>
                  <View style={styles.genreContent}>
                    <View style={styles.genreIconBadge}>
                      <Text style={styles.genreIcon}>{genre.icon}</Text>
                    </View>
                    <Text style={styles.genreName}>{genre.name}</Text>
                    <Text style={styles.genreCount}>{formatNumber(genre.count)} séries</Text>
                  </View>
                  
                  {genreSeries.length > 0 && (
                    <View style={styles.genrePreview}>
                      {genreSeries.slice(0, 3).map((series) => (
                        <View
                          key={series.id}
                          style={styles.previewItem}
                        >
                          <Image
                            source={{ uri: series.thumbnailUrl }}
                            style={styles.previewImage}
                            contentFit="cover"
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
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
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  genreBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  genreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  genreContent: {
    flex: 1,
  },
  genreIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  genreIcon: {
    fontSize: 24,
  },
  genreName: {
    ...typography.h2Section,
    color: Colors.text.white,
    fontSize: 22,
  },
  genreCount: {
    ...typography.bodyRegular,
    fontSize: 13,
    color: Colors.text.muted,
    marginTop: 4,
  },
  genrePreview: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-end',
  },
  previewItem: {
    width: 45,
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
