import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [showRoomPicker, setShowRoomPicker] = useState(false);
  const [additionalContext, setAdditionalContext] = useState('');
  const [link, setLink] = useState('');

  const meetingTopics = [
    'Brainstorm new content',
    'Fix existing content',
    'Review content strategy',
    'Discuss content guidelines'
  ];

  const timeSlots = [
    '1:00-1:30',
    '1:30-2:00'
  ];

  const rooms = [
    'Conference Room A',
    'Conference Room B',
    'Meeting Room 1',
    'Meeting Room 2',
    'Virtual (Zoom)'
  ];

  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth, today: today.getDate(), month, year };
  };

  const { firstDay, daysInMonth, today, month, year } = getDaysInMonth();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Kyle Office Hours</Text>
          <Text style={styles.subtitle}>Select a date and time</Text>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Meeting Topic</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={[
                styles.dropdown,
                (showDropdown || selectedTopic) && styles.dropdownActive
              ]}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={[styles.dropdownText, !selectedTopic && styles.placeholderText]}>
                {selectedTopic || 'Choose a topic...'}
              </Text>
              <Text style={[
                styles.dropdownArrow,
                (showDropdown || selectedTopic) && styles.dropdownArrowActive
              ]}>
                {showDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
            
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {meetingTopics.map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      index === meetingTopics.length - 1 && styles.dropdownItemLast
                    ]}
                    onPress={() => {
                      setSelectedTopic(topic);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.calendarContainer}>
              <View style={styles.card}>
                <Text style={styles.monthTitle}>{monthNames[month]} {year}</Text>
                
                <View style={styles.calendarHeader}>
                  {dayNames.map(day => (
                    <Text key={day} style={styles.dayName}>{day}</Text>
                  ))}
                </View>

                <View style={styles.calendarGrid}>
                  {[...Array(firstDay)].map((_, index) => (
                    <View key={`empty-${index}`} style={styles.dayCell} />
                  ))}
                  
                  {[...Array(daysInMonth)].map((_, index) => {
                    const day = index + 1;
                    const isToday = day === today;
                    const isPast = day < today;
                    const isSelected = selectedDate === day;
                    
                    return (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.dayCell,
                          isToday && styles.todayCell,
                          isSelected && styles.selectedDayCell,
                          isPast && styles.pastDayCell
                        ]}
                        onPress={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                      >
                        <Text style={[
                          styles.dayText,
                          isToday && styles.todayText,
                          isSelected && styles.selectedDayText,
                          isPast && styles.pastDayText
                        ]}>
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.timeContainer}>
              <View style={styles.card}>
                <Text style={styles.timeTitle}>Select Time</Text>
                <View style={styles.timeOptionsContainer}>
                  {timeSlots.map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeOption,
                        selectedTime === time && styles.timeOptionSelected
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text style={[
                        styles.timeOptionText,
                        selectedTime === time && styles.timeOptionTextSelected
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.roomTitle}>Pick a Room</Text>
                <TouchableOpacity 
                  style={[
                    styles.dropdown,
                    (showRoomPicker || selectedRoom) && styles.dropdownActive
                  ]}
                  onPress={() => setShowRoomPicker(!showRoomPicker)}
                >
                  <Text style={[styles.dropdownText, !selectedRoom && styles.placeholderText]}>
                    {selectedRoom || 'Choose a room...'}
                  </Text>
                  <Text style={[
                    styles.dropdownArrow,
                    (showRoomPicker || selectedRoom) && styles.dropdownArrowActive
                  ]}>
                    {showRoomPicker ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>
                
                {showRoomPicker && (
                  <View style={styles.dropdownMenu}>
                    {rooms.map((room, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownItem,
                          index === rooms.length - 1 && styles.dropdownItemLast
                        ]}
                        onPress={() => {
                          setSelectedRoom(room);
                          setShowRoomPicker(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{room}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.linkContainer}>
              <View style={styles.card}>
                <Text style={styles.linkTitle}>Link (Optional)</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    link && styles.textInputActive
                  ]}
                  placeholder="Paste a link..."
                  value={link}
                  onChangeText={setLink}
                  keyboardType="url"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Additional Context</Text>
          <View style={styles.card}>
            <TextInput
              style={[
                styles.textArea,
                additionalContext && styles.textAreaActive
              ]}
              placeholder="Add any additional details or context..."
              value={additionalContext}
              onChangeText={setAdditionalContext}
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {selectedTopic && selectedDate && selectedTime && selectedRoom && (
          <View style={styles.bookingSection}>
            <View style={styles.confirmationCard}>
              <Text style={styles.confirmationTitle}>Booking Summary</Text>
              <Text style={styles.confirmationText}>Topic: {selectedTopic}</Text>
              <Text style={styles.confirmationText}>
                Date: {monthNames[month]} {selectedDate}, {year}
              </Text>
              <Text style={styles.confirmationText}>Time: {selectedTime}</Text>
              <Text style={styles.confirmationText}>Room: {selectedRoom}</Text>
              {additionalContext ? (
                <Text style={styles.confirmationText}>Context: {additionalContext}</Text>
              ) : null}
              {link ? (
                <Text style={styles.confirmationText}>Link: {link}</Text>
              ) : null}
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  bookingSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  calendarContainer: {
    maxWidth: 400,
    flex: 1,
  },
  timeContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  linkContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  timeOptionsContainer: {
    marginBottom: 20,
  },
  timeOption: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  timeOptionSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  timeOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownActive: {
    borderColor: '#3b82f6',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 8,
  },
  dropdownArrowActive: {
    color: '#3b82f6',
  },
  dropdownMenu: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    maxHeight: 250,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  todayCell: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  selectedDayCell: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  pastDayCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  todayText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  pastDayText: {
    color: '#999',
  },
  textArea: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  textAreaActive: {
    borderColor: '#3b82f6',
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textInputActive: {
    borderColor: '#3b82f6',
  },
  confirmationCard: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  confirmationText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  confirmButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '600',
  },
});
