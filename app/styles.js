import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700', fontFamily: 'Poppins_700Bold', marginTop: 2 },
  headerSubtitle: { color: '#E0E7FF', fontSize: 14, textAlign: 'center', width: '80%', fontFamily: 'Poppins_400Regular' },
  
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginLeft: 6, color: '#0078D7', fontFamily: 'Poppins_700Bold' },
  sectionDesc: { color: '#6B7280', marginBottom: 3, fontFamily: 'Poppins_400Regular' },

  label: { fontWeight: '600', marginTop: 6, marginBottom: 4, color: '#111827', fontFamily: 'Poppins_700Bold' },
  inputContainer: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, backgroundColor: '#F9FAFB', marginBottom: 10 },
  input: { padding: 10, fontFamily: 'Poppins_400Regular' },
  picker: { width: '100%' },

  audioSection: { marginTop: 10 },
  recordButton: { borderRadius: 12, paddingVertical: 12, marginTop: 10, alignItems: 'center' },
  recordButtonText: { color: '#fff', fontWeight: '700', fontSize: 16, fontFamily: 'Poppins_700Bold' },
  playButton: { backgroundColor: '#E0F2FE', padding: 10, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  playButtonText: { color: '#0078D7', fontWeight: '600', fontFamily: 'Poppins_700Bold' },

  submitButton: { backgroundColor: '#3B82F6', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: '700', fontFamily: 'Poppins_700Bold' },
});
