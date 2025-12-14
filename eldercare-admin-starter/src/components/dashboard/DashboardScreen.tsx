import React, { useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useCareData } from '../../context/CareDataContext';
import MetricCard from './MetricCard';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen: React.FC = () => {
  const { patients } = useCareData();

  const totalPatients = patients.length;
  const totalAppointments = useMemo(
    () =>
      patients.reduce(
        (acc, p) => acc + (p.appointments ? p.appointments.length : 0),
        0,
      ),
    [patients],
  );

  const bpData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [132, 128, 130, 126, 124, 129, 127],
        strokeWidth: 2,
      },
    ],
  };

  const apptData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [4, 5, 6, 3, 7, 2, 1] }],
  };

  const chartWidth = Math.max(320, screenWidth - 64 - 256 - 32);

  return (
    <ScrollView className="flex-1 bg-slate-900 p-6">
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-2xl font-semibold text-white mb-1">
            Care Operations Overview
          </Text>
          <Text className="text-xs text-slate-400">
            Elderly patient management, vitals, medications, and appointments
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-4 mb-6">
        <MetricCard label="Active patients" value={totalPatients.toString()} />
        <MetricCard
          label="Appointments scheduled"
          value={totalAppointments.toString()}
        />
        <MetricCard label="Avg systolic BP (7d)" value="128 mmHg" />
        <MetricCard label="Med adherence (mock)" value="93%" />
      </View>

      <View className="bg-slate-950 rounded-2xl p-4 mb-6">
        <Text className="text-white font-semibold mb-2">
          Blood pressure – average systolic (last 7 days)
        </Text>
        <LineChart
          data={bpData}
          width={chartWidth}
          height={220}
          yAxisSuffix=" mmHg"
          chartConfig={{
            backgroundGradientFrom: '#020617',
            backgroundGradientTo: '#020617',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34,197,94,${opacity})`,
            labelColor: (opacity = 1) => `rgba(148,163,184,${opacity})`,
            propsForDots: {
              r: '3',
            },
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <View className="bg-slate-950 rounded-2xl p-4 mb-6">
        <Text className="text-white font-semibold mb-2">
          Appointment load by weekday
        </Text>
        <BarChart
          data={apptData}
          width={chartWidth}
          height={220}
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#020617',
            backgroundGradientTo: '#020617',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
            labelColor: (opacity = 1) => `rgba(148,163,184,${opacity})`,
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
