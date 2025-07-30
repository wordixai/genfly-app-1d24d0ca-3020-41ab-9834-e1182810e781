import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSleepStore } from '@/store/sleepStore';
import { Target, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SleepGoals = () => {
  const { goal, setGoal } = useSleepStore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(goal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoal(formData);
    
    toast({
      title: "目标已更新",
      description: "你的睡眠目标已成功保存",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
          <Target className="mr-2 h-4 w-4" />
          睡眠目标
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            设置睡眠目标
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetBedtime" className="text-gray-300">目标就寝时间</Label>
              <Input
                id="targetBedtime"
                type="time"
                value={formData.targetBedtime}
                onChange={(e) => setFormData({ ...formData, targetBedtime: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="targetWakeTime" className="text-gray-300">目标起床时间</Label>
              <Input
                id="targetWakeTime"
                type="time"
                value={formData.targetWakeTime}
                onChange={(e) => setFormData({ ...formData, targetWakeTime: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetDuration" className="text-gray-300">目标睡眠时长</Label>
            <div className="flex items-center gap-2">
              <Input
                id="targetDuration"
                type="number"
                min="4"
                max="12"
                step="0.5"
                value={formData.targetDuration}
                onChange={(e) => setFormData({ ...formData, targetDuration: parseFloat(e.target.value) })}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <span className="text-gray-300">小时</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              建议成年人每晚睡眠 7-9 小时
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-400 mb-2">当前目标</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>🕙 就寝时间: {goal.targetBedtime}</div>
              <div>🌅 起床时间: {goal.targetWakeTime}</div>
              <div>⏰ 睡眠时长: {goal.targetDuration} 小时</div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="sleep-gradient hover:shadow-lg"
            >
              保存目标
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};