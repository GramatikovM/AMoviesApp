import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

const RemoveHint = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(true);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!visible) return null;

  return (
    <Pressable style={styles.hintContainer} onPress={() => setVisible(false)}>
      <Text style={styles.hintText}>{text}</Text>
      <Text style={styles.hintDismiss}>Got it</Text>
    </Pressable>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    hintContainer: {
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    hintText: {
      fontSize: 13,
      color: colors.textPrimary,
    },
    hintDismiss: {
      marginTop: 6,
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

export default RemoveHint;
