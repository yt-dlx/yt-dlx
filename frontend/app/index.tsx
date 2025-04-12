import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from "react-native";
const BASE_URL = "http://localhost:3000";
const qualityTypes = ["Highest", "Lowest", "Custom"];
const mediaTypes = ["AudioOnly", "VideoOnly", "AudioVideo"];
const audioResolutions = ["ultralow", "low", "medium", "high"];
const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"];
export default function Index() {
  const [mediaType, setMediaType] = useState("AudioOnly");
  const [resolution, setResolution] = useState("720p");
  const [searchQuery, setSearchQuery] = useState("");
  const [quality, setQuality] = useState("Highest");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    let endpoint = `/${mediaType}${quality}`;
    let queryString = `?query=${encodeURIComponent(searchQuery)}`;
    if (quality === "Custom") {
      if (mediaType === "AudioOnly") queryString += `&resolution=${resolution.toLowerCase()}`;
      else queryString += `&resolution=${resolution}`;
    }
    try {
      const res = await fetch(`${BASE_URL}${endpoint}${queryString}`);
      if (!res.ok) {
        const errRes = await res.json();
        throw new Error(errRes.error || "Something went wrong");
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const renderResolutionPicker = () => {
    if (quality !== "Custom") return null;
    const availableOptions = mediaType === "AudioOnly" ? audioResolutions : resolutions;
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Resolution:</Text>
        <Picker selectedValue={resolution} onValueChange={itemValue => setResolution(itemValue)} style={styles.picker} dropdownIconColor="#ebdbb2">
          {availableOptions.map(res => (
            <Picker.Item label={res} value={res} key={res} color="#ebdbb2" />
          ))}
        </Picker>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Enter YouTube search..." placeholderTextColor="#a89984" value={searchQuery} onChangeText={setSearchQuery} onSubmitEditing={handleSearch} />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type:</Text>
        <Picker selectedValue={mediaType} onValueChange={(val: any) => setMediaType(val)} style={styles.picker} dropdownIconColor="#ebdbb2">
          {mediaTypes.map(type => (
            <Picker.Item key={type} label={type} value={type} color="#ebdbb2" />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Quality:</Text>
        <Picker selectedValue={quality} onValueChange={(val: any) => setQuality(val)} style={styles.picker} dropdownIconColor="#ebdbb2">
          {qualityTypes.map(q => (
            <Picker.Item key={q} label={q} value={q} color="#ebdbb2" />
          ))}
        </Picker>
      </View>
      {renderResolutionPicker()}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator color="#fabd2f" style={{ marginTop: 20 }} />} {error && <Text style={styles.errorText}>{error}</Text>}
      {result && (
        <ScrollView style={styles.resultBox}>
          <Text style={styles.resultText}>🎵 Title: {result.title}</Text> <Text style={styles.resultText}>👤 Author: {result.author}</Text>
          <Text style={styles.resultText}>📅 Uploaded: {result.uploadDate}</Text> <Text style={styles.resultText}>⏱ Duration: {result.durationFormatted}</Text>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: { height: 45, backgroundColor: "#3c3836", color: "#ebdbb2", borderColor: "#504945", borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 15 },
  button: { backgroundColor: "#689d6a", paddingVertical: 10, borderRadius: 6, alignItems: "center", marginBottom: 20 },
  picker: { backgroundColor: Platform.OS === "android" ? "#3c3836" : undefined, color: "#ebdbb2" },
  container: { flex: 1, backgroundColor: "#282828", paddingTop: 60, paddingHorizontal: 20 },
  errorText: { color: "#fb4934", textAlign: "center", marginTop: 10 },
  buttonText: { color: "#ebdbb2", fontWeight: "bold", fontSize: 16 },
  resultText: { color: "#ebdbb2", fontSize: 16, marginBottom: 6 },
  label: { color: "#ebdbb2", marginBottom: 5 },
  pickerContainer: { marginBottom: 15 },
  resultBox: { marginTop: 20 },
});
