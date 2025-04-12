import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, StatusBar, FlatList, Image, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Oops!", "Please enter a video or playlist to search.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);
    try {
      let response = await fetch(`http://localhost:4040/Search_Multiple_Videos?query=${encodeURIComponent(searchQuery)}`);
      let data = await response.json();
      if (response.ok && data.videos?.length > 0) {
        setResults(data.videos);
      } else {
        response = await fetch(`http://localhost:4040/Search_Multiple_Playlists?playlistLink=${encodeURIComponent(searchQuery)}`);
        data = await response.json();
        if (response.ok && data.playlists?.length > 0) setResults(data.playlists);
        else setError("No videos or playlists found.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.resultItem}>
      {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />} <Text style={styles.resultTitle}>{item.title || "Untitled"}</Text>
    </View>
  );
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Ionicons name="play-circle" size={48} color="#FF0000" style={styles.icon} /> <Text style={styles.appName}>YouTubeMax</Text>
      </View>
      <Text style={styles.tagline}>Find your favorite videos and playlists.</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Video name, ID, link, or playlist..."
          placeholderTextColor="#888888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Ionicons name="search" size={24} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        style={styles.resultsList}
        ListEmptyComponent={!isLoading && !error && results.length === 0 ? <Text style={styles.noResults}>Search to find videos or playlists.</Text> : null}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 60, marginBottom: 20 },
  icon: { marginRight: 10 },
  appName: { fontSize: 36, fontWeight: "900", color: "#FFFFFF", letterSpacing: 0.5 },
  tagline: { fontSize: 16, color: "#BBBBBB", marginBottom: 20, textAlign: "center" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 16, color: "#FFFFFF", paddingVertical: 10, paddingHorizontal: 15 },
  button: { backgroundColor: "#FF0000", padding: 12, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  error: { color: "#FF4444", fontSize: 14, marginBottom: 10, textAlign: "center" },
  resultsList: { flex: 1, width: "100%" },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: { width: 80, height: 60, borderRadius: 8, marginRight: 10 },
  resultTitle: { flex: 1, fontSize: 16, color: "#FFFFFF" },
  noResults: { color: "#888888", fontSize: 16, textAlign: "center", marginTop: 20 },
});
