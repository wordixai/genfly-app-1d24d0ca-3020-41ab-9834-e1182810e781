import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSleepStore } from '@/store/sleepStore';
import { format, subDays, parseISO } from 'date-fns';

export const SleepChart = () => {
  const { entries } = useSleepStore();
  
  // Prepare data for the last 7 days
  const chartData = React.useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const entry = entries.find(e => e.date === dateStr);
      
      data.push({
        date: format(date, 'MM/dd'),
        duration: entry ? entry.duration / 60 : 0, // Convert to hours
        quality: entry ? entry.quality : 0,
        bedtimeHour: entry ? parseInt(entry.bedtime.split(':')[0]) : null,
        wakeTimeHour: entry ? parseInt(entry.wakeTime.split(':')[0]) : null,
      });
    }
    return data;
  }, [entries]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'duration' ? `时长: ${entry.value.toFixed(1)}小时` : 
               entry.name === 'quality' ? `质量: ${entry.value}/5` : 
               `${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Duration Chart */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-4">睡眠时长趋势</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={[0, 12]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="duration" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quality Chart */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-4">睡眠质量</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={[0, 5]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="quality" 
              fill="url(#qualityGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};