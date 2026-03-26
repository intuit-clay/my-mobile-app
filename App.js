import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const meetingTopics = [
    'Brainstorm new content',
    'Fix existing content',
    'Review content strategy',
    'Discuss content guidelines'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Time with Content Designer</Text>
          <Text style={styles.subtitle}>Select a date and time</Text>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Meeting Topic</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={[styles.dropdownText, !selectedTopic && styles.placeholderText]}>
                {selectedTopic || 'Choose a topic...'}
              </Text>
              <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
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
          <Text style={styles.sectionTitle}>Select Date</Text>
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

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowTimePicker(!showTimePicker)}
            >
              <Text style={[styles.dropdownText, !selectedTime && styles.placeholderText]}>
                {selectedTime || 'Choose a time...'}
              </Text>
              <Text style={styles.dropdownArrow}>{showTimePicker ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {showTimePicker && (
              <View style={styles.dropdownMenu}>
                {timeSlots.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      index === timeSlots.length - 1 && styles.dropdownItemLast
                    ]}
                    onPress={() => {
                      setSelectedTime(time);
                      setShowTimePicker(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {selectedTopic && selectedDate && selectedTime && (
          <View style={styles.bookingSection}>
            <View style={styles.confirmationCard}>
              <Text style={styles.confirmationTitle}>Booking Summary</Text>
              <Text style={styles.confirmationText}>Topic: {selectedTopic}</Text>
              <Text style={styles.confirmationText}>
                Date: {monthNames[month]} {selectedDate}, {year}
              </Text>
              <Text style={styles.confirmationText}>Time: {selectedTime}</Text>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 800,
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
  dropdown: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#3b82f6',
    marginLeft: 8,
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
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
  },
  selectedDayCell: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  pastDayCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  todayText: {
    color: '#0369a1',
    fontWeight: '600',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  pastDayText: {
    color: '#999',
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
