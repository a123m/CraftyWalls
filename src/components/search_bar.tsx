import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  value,
  onEndEditing,
  style,
}: {
  value: string;
  onEndEditing: (text: string) => void;
  style?: ViewStyle;
}) {
  const [query, setQuery] = useState(value);
  const [error, setError] = useState('');

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Ionicons name='search' size={20} color='black' />
        </View>

        <TextInput
          value={query}
          placeholder='Search here.'
          autoFocus={true}
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={(text) => {
            var letters = /^$|^[a-zA-Z0-9._\b ]+$/;
            if (text.length > 30) alert('Query too long.');
            else if (text.match(letters)) {
              setQuery(text);
              if (error) setError('');
            } else alert('Please only enter alphabets');
          }}
          onEndEditing={() => onEndEditing(query)}
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.vwClear}>
            <Ionicons name='close-circle-outline' size={24} color='black' />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // backgroundColor: 'red'
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: 35,
    flexDirection: 'row',
  },
  container: {
    height: 44,
    alignItems: 'center',
    // height: '100%', width: '100%'
  },
});
