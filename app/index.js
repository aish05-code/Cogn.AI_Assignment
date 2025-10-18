import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import styles from './styles';

export default function App() {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const confettiRef = useRef(null);

  const categories = {
    Art: ['Painting', 'Sculpture', 'Drawing'],
    Sports: ['Cricket', 'Football', 'Tennis'],
    'Theatre Art': ['Acting', 'Stagecraft'],
    Reading: ['Fiction', 'Poetry', 'Non-fiction'],
  };

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  if (!fontsLoaded) return <ActivityIndicator size="large" color="#fff" style={{ flex: 1 }} />;

  // ---------------- AUDIO RECORDING ----------------
  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync();
    if (permission.status !== 'granted') return alert('Mic permission required 🎤');

    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
    await rec.startAsync();
    setRecording(rec);
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    setRecordedUri(recording.getURI());
    setRecording(null);
  };

  // ---------------- VALIDATION ----------------
  const isFormComplete = () => {
    return name && studentClass && gender && category && subcategory && recordedUri;
  };

  // ---------------- FORM SUBMISSION ----------------
  const handleSubmit = () => {
    if (!isFormComplete()) {
      Alert.alert('Incomplete Form', 'Please fill all fields and record your introduction.');
      return;
    }

    setSubmitted(true);
    confettiRef.current?.start();

    setTimeout(() => {
      setName('');
      setStudentClass('');
      setGender('');
      setCategory('');
      setSubcategory('');
      setRecordedUri(null);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <LinearGradient colors={['#3B82F6', '#9333EA']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
        {/* HEADER */}
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Ionicons name="school-outline" size={50} color="#fff" />
          <Text style={styles.headerTitle}>Student Profile Portal</Text>
          <Text style={styles.headerSubtitle}>Share your story, interests, and aspirations</Text>
        </View>

        {/* FORM CARD */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 900 }}
          style={styles.card}
        >
          {/* PROFILE */}
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={24} color="#0078D7" />
            <Text style={styles.sectionTitle}>Student Profile</Text>
          </View>
          <Text style={styles.sectionDesc}>Tell us about yourself and your interests</Text>

          {/* NAME */}
          <Text style={styles.label}>Student Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* CLASS */}
          <Text style={styles.label}>Class</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g., 10th Grade"
              placeholderTextColor="#9CA3AF"
              value={studentClass}
              onChangeText={setStudentClass}
            />
          </View>

          {/* GENDER */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.inputContainer}>
            <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
              <Picker.Item label="Select an option" value="" color="#9CA3AF" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          {/* CATEGORY */}
          <Text style={styles.label}>Interest Category</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(val) => {
                setCategory(val);
                setSubcategory('');
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select an option" value="" color="#9CA3AF" />
              {Object.keys(categories).map((c) => (
                <Picker.Item label={c} value={c} key={c} />
              ))}
            </Picker>
          </View>

          {/* SUBCATEGORY */}
          {category && (
            <>
              <Text style={styles.label}>Subcategory</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={subcategory}
                  onValueChange={setSubcategory}
                  style={styles.picker}
                >
                  <Picker.Item label="Select an option" value="" color="#9CA3AF" />
                  {categories[category].map((sc) => (
                    <Picker.Item label={sc} value={sc} key={sc} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {/* AUDIO */}
          <View style={styles.audioSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="mic-outline" size={22} color="#F97316" />
              <Text style={[styles.sectionTitle, { color: '#F97316' }]}>Student Introduction</Text>
            </View>
            <Text style={styles.sectionDesc}>Record a brief introduction about yourself</Text>

            <MotiView
              animate={{ scale: recording ? 1.05 : 1 }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <LinearGradient
                colors={['#FB923C', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.recordButton}
              >
                <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
                  <Text style={styles.recordButtonText}>
                    {recording ? '⏹ Stop Recording' : 'Start Recording 🎤'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </MotiView>

            {recordedUri && (
              <TouchableOpacity
                onPress={async () => {
                  const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
                  await sound.playAsync();
                }}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>▶️ Play Recording</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* SUBMIT */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={submitted}
          >
            <Text style={styles.submitText}>{submitted ? 'Submitted!' : 'Submit Profile'}</Text>
          </TouchableOpacity>

          {submitted && (
            <ConfettiCannon ref={confettiRef} count={50} origin={{ x: 180, y: 0 }} fadeOut />
          )}
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}
