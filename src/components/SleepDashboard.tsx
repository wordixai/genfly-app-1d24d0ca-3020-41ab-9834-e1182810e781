import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useSleepStore } from '@/store/sleepStore';
import { Moon, Sun, Clock, TrendingUp, Target, Calendar } from 'lucide-react';
import { SleepChart } from './SleepChart';
import { AddSleepEntry } from './AddSleepEntry';
import { SleepGoals } from './SleepGoals';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';

export const SleepDashboard = () => {
  const { entries, goal, getAverageQuality, getAverageDuration } = useSleepStore();

  const today = new Date();
  const lastEntry = entries[0];
  const averageQuality = getAverageQuality(7);
  const averageDuration = getAverageDuration(7);

  // Calculate streak (consecutive days with entries)
  const streak = React.useMemo(() => {
    let count = 0;
    let currentDate = new Date();

    for (let i = 0; i < 30; i++) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const hasEntry = entries.some((entry) => entry.date === dateStr);

      if (hasEntry) {
        count++;
        currentDate = subDays(currentDate, 1);
      } else {
        break;
      }
    }

    return count;
  }, [entries]);

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'terrible':return '😫';
      case 'poor':return '😴';
      case 'okay':return '😐';
      case 'good':return '😊';
      case 'excellent':return '🌟';
      default:return '😐';
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 4) return 'text-green-400';
    if (quality >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const progressToGoal = Math.min(averageDuration / goal.targetDuration * 100, 100);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className='text-transparent text-4xl font-bold bg-clip-text from-purple-400 to-blue-400 mb-2'>睡眠管理拥有一个好睡眠

        </h1>
        <p className="text-gray-300">追踪和改善你的睡眠质量</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Last Night's Sleep */}
        <Card className="sleep-card border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">昨晚睡眠</CardTitle>
            <Moon className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            {lastEntry ?
            <div>
                <div className="text-2xl font-bold text-white">
                  {Math.floor(lastEntry.duration / 60)}h {lastEntry.duration % 60}m
                </div>
                <p className="text-xs text-gray-400">
                  {lastEntry.bedtime} - {lastEntry.wakeTime}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg">{getMoodEmoji(lastEntry.mood)}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) =>
                  <span key={i} className={i < lastEntry.quality ? 'text-yellow-400' : 'text-gray-600'}>
                        ⭐
                      </span>
                  )}
                  </div>
                </div>
              </div> :

            <div className="text-gray-400">还没有睡眠记录</div>
            }
          </CardContent>
        </Card>

        {/* Average Quality */}
        <Card className="sleep-card border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">平均质量</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getQualityColor(averageQuality)}`}>
              {averageQuality}/5
            </div>
            <p className="text-xs text-gray-400">过去7天</p>
            <div className="mt-2">
              <Progress value={averageQuality / 5 * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Average Duration */}
        <Card className="sleep-card border-cyan-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">平均时长</CardTitle>
            <Clock className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{averageDuration}h</div>
            <p className="text-xs text-gray-400">过去7天</p>
            <div className="mt-2">
              <Progress value={progressToGoal} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">
                目标: {goal.targetDuration}h
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card className="sleep-card border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">连续记录</CardTitle>
            <Calendar className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{streak}</div>
            <p className="text-xs text-gray-400">天</p>
            {streak > 0 &&
            <Badge variant="secondary" className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                🔥 保持下去！
              </Badge>
            }
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 sleep-card">
          <CardHeader>
            <CardTitle className="text-white">睡眠趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <SleepChart />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="sleep-card">
          <CardHeader>
            <CardTitle className="text-white">快捷操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddSleepEntry />
            <SleepGoals />
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card className="sleep-card">
        <CardHeader>
          <CardTitle className="text-white">最近记录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) =>
            <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">
                      {format(new Date(entry.date), 'MM/dd')}
                    </div>
                    <div className="text-lg">{getMoodEmoji(entry.mood)}</div>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                    </div>
                    <div className="text-sm text-gray-400">
                      {entry.bedtime} - {entry.wakeTime}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) =>
                <span key={i} className={i < entry.quality ? 'text-yellow-400' : 'text-gray-600'}>
                      ⭐
                    </span>
                )}
                </div>
              </div>
            )}
            {entries.length === 0 &&
            <div className="text-center text-gray-400 py-8">
                还没有睡眠记录，开始记录你的第一个睡眠吧！
              </div>
            }
          </div>
        </CardContent>
      </Card>
    </div>);

};