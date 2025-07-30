import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSleepStore } from '@/store/sleepStore';
import { format } from 'date-fns';
import { Plus, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AddSleepEntry = () => {
  const { addEntry } = useSleepStore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    bedtime: '',
    wakeTime: '',
    quality: 3,
    mood: 'okay' as const,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.bedtime || !formData.wakeTime) {
      toast({
        title: "请填写完整信息",
        description: "请输入就寝时间和起床时间",
        variant: "destructive"
      });
      return;
    }

    addEntry(formData);
    
    toast({
      title: "睡眠记录已添加",
      description: "你的睡眠数据已保存成功",
    });

    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      bedtime: '',
      wakeTime: '',
      quality: 3,
      mood: 'okay',
      notes: ''
    });
    
    setOpen(false);
  };

  const moodOptions = [
    { value: 'terrible', label: '糟糕 😫', color: 'text-red-400' },
    { value: 'poor', label: '差 😴', color: 'text-orange-400' },
    { value: 'okay', label: '一般 😐', color: 'text-yellow-400' },
    { value: 'good', label: '好 😊', color: 'text-green-400' },
    { value: 'excellent', label: '很棒 🌟', color: 'text-blue-400' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sleep-gradient hover:shadow-lg hover:scale-105 transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          记录睡眠
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-purple-400" />
            添加睡眠记录
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-gray-300">日期</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="quality" className="text-gray-300">质量评分</Label>
              <Select value={formData.quality.toString()} onValueChange={(value) => setFormData({ ...formData, quality: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <SelectItem key={score} value={score.toString()}>
                      {'⭐'.repeat(score)} ({score}/5)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedtime" className="text-gray-300">就寝时间</Label>
              <Input
                id="bedtime"
                type="time"
                value={formData.bedtime}
                onChange={(e) => setFormData({ ...formData, bedtime: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="wakeTime" className="text-gray-300">起床时间</Label>
              <Input
                id="wakeTime"
                type="time"
                value={formData.wakeTime}
                onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="mood" className="text-gray-300">心情状态</Label>
            <Select value={formData.mood} onValueChange={(value: any) => setFormData({ ...formData, mood: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {moodOptions.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value}>
                    <span className={mood.color}>{mood.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-gray-300">备注 (可选)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white resize-none"
              placeholder="记录影响睡眠的因素..."
              rows={3}
            />
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
              保存记录
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};