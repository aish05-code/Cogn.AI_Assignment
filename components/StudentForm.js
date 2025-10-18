import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

// Helper: categories and subcategories
const CATEGORIES = {
  Art: ["Painting", "Sculpture", "Drawing"],
  Sports: ["Cricket", "Football", "Tennis"],
  "Theatre Art": ["Acting", "Stagecraft"],
  Reading: ["Fiction", "Non-fiction", "Poetry"]
};

export default function StudentForm() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      class: "",
      gender: "Male",
      category: "Art",
      subcategory: CATEGORIES["Art"][0],
      introText: ""
    }
  });

  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploading, setUploading] = useState(false);

  const watchCategory = watch("category");

  // Start recording (Expo AV for native; web uses same API via expo-av when running web in Expo)
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Permission required", "Microphone permission is required to record audio.");
        return;
      }

      // Configure mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      // Choose format & bitrate to compress: lower bitrate for optimization
      const recordingOptions = {
        android: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 64000
        },
        ios: {
          extension: ".m4a",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_LOW,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 64000
        },
        web: {
          mimeType: "audio/webm"
        }
      };

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(recordingOptions);
      await rec.startAsync();
      setRecording(rec);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // Stop recording
  async function stopRecording() {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedUri(uri);
      setIsRecording(false);
      setRecording(null);

      // Optionally compress further by re-encoding - complex; we rely on recording options bitrate
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  // Upload function: POST to endpoint (dummy endpoint — assignment says no server needed, but we show how)
  async function onSubmit(data) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("class", data.class);
      form.append("gender", data.gender);
      form.append("category", data.category);
      form.append("subcategory", data.subcategory);
      form.append("introText", data.introText);

      if (recordedUri) {
        // Read file info
        const fileInfo = await FileSystem.getInfoAsync(recordedUri);
        let fileName = recordedUri.split("/").pop();
        // On web, URI might be blob:... ; for web, exclude FileSystem read and use fetch blob
        if (Platform.OS === "web") {
          const blob = await (await fetch(recordedUri)).blob();
          form.append("audio", blob, fileName || "intro.webm");
        } else {
          const fileUri = recordedUri;
          // get mime type from extension
          const mime = fileName.endsWith(".m4a") ? "audio/m4a" : "audio/webm";
          const fileBlob = {
            uri: fileUri,
            name: fileName,
            type: mime
          };
          form.append("audio", fileBlob);
        }
      }

      // Replace the URL below with real endpoint if available
      const ENDPOINT = "https://example.com/submit-student-profile";

      // Use fetch (no actual server required per assignment) — comment out actual network call if not needed
      await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          // 'Content-Type': 'multipart/form-data' // do not set this header; let fetch set boundary
        },
        body: form
      }).catch((e) => {
        // since endpoint may not exist, we catch errors
        console.warn("Upload (caught):", e.message);
      });

      Alert.alert("Submitted", "Student profile prepared and (attempted) submitted.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to submit. See console.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Student Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} value={value} onChangeText={onChange} />
        )}
      />

      <Text style={styles.label}>Class</Text>
      <Controller
        control={control}
        name="class"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} value={value} onChangeText={onChange} />
        )}
      />

      <Text style={styles.label}>Gender</Text>
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        )}
      />

      <Text style={styles.label}>Interest Category</Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(val) => {
              onChange(val);
            }}
            style={styles.picker}
          >
            {Object.keys(CATEGORIES).map((cat) => (
              <Picker.Item label={cat} value={cat} key={cat} />
            ))}
          </Picker>
        )}
      />

      <Text style={styles.label}>Subcategory</Text>
      <Controller
        control={control}
        name="subcategory"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            {CATEGORIES[watchCategory].map((s) => (
              <Picker.Item label={s} value={s} key={s} />
            ))}
          </Picker>
        )}
      />

      <Text style={styles.label}>Student Introduction (text)</Text>
      <Controller
        control={control}
        name="introText"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <View style={{ marginVertical: 8 }}>
        <Text style={styles.label}>Record Introduction (audio)</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {!isRecording ? (
            <Button title="Start Recording" onPress={startRecording} />
          ) : (
            <Button title="Stop Recording" onPress={stopRecording} color="#d9534f" />
          )}
          <Button
            title="Play"
            onPress={async () => {
              if (!recordedUri) {
                Alert.alert("No recording", "Record audio first.");
                return;
              }
              try {
                const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
                await sound.playAsync();
              } catch (e) {
                console.warn(e);
              }
            }}
          />
        </View>
        {recordedUri ? <Text style={{ marginTop: 6 }}>Recorded: {recordedUri}</Text> : null}
      </View>

      <View style={{ marginTop: 12 }}>
        <Button title={uploading ? "Submitting..." : "Submit Profile"} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 12, borderRadius: 8 },
  label: { fontWeight: "600", marginTop: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 6, marginTop: 4 },
  picker: { marginTop: 4 }
});
