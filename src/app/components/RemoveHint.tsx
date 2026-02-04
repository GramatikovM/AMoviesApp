import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const RemoveHint = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Pressable style={styles.hintContainer} onPress={() => setVisible(false)}>
      <Text style={styles.hintText}>{text}</Text>
      <Text style={styles.hintDismiss}>Got it</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  hintText: {
    fontSize: 13,
    color: '#fff',
  },
  hintDismiss: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },
});

export default RemoveHint;