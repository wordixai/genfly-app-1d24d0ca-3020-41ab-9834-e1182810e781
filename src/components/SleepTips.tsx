import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Moon, Sun, Coffee, Phone, Thermometer } from 'lucide-react';

export const SleepTips = () => {
  const tips = [
    {
      icon: Moon,
      category: "睡前准备",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      tips: [
        "睡前1小时关闭电子设备",
        "保持卧室温度在18-22°C",
        "睡前进行轻度拉伸或瑜伽",
        "使用遮光窗帘营造暗环境"
      ]
    },
    {
      icon: Coffee,
      category: "饮食建议",
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      tips: [
        "下午2点后避免咖啡因",
        "睡前3小时不要大量进食",
        "可以喝温牛奶或洋甘菊茶",
        "避免睡前饮酒"
      ]
    },
    {
      icon: Sun,
      category: "作息规律",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      tips: [
        "每天同一时间起床和睡觉",
        "早上多晒太阳调节生物钟",
        "午睡不超过30分钟",
        "周末也要保持规律作息"
      ]
    },
    {
      icon: Phone,
      category: "睡眠环境",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      tips: [
        "卧室只用于睡觉",
        "使用白噪音机器或耳塞",
        "确保床垫和枕头舒适",
        "移除卧室内的时钟"
      ]
    }
  ];

  const qualityFactors = [
    { factor: "规律作息", impact: "高", color: "text-green-400" },
    { factor: "睡眠环境", impact: "高", color: "text-green-400" },
    { factor: "运动习惯", impact: "中", color: "text-yellow-400" },
    { factor: "饮食时间", impact: "中", color: "text-yellow-400" },
    { factor: "电子设备", impact: "中", color: "text-yellow-400" },
    { factor: "压力水平", impact: "高", color: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="sleep-card border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="h-5 w-5 text-green-400" />
            睡眠改善建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            良好的睡眠习惯能显著提高睡眠质量。以下是一些科学证实的睡眠改善方法：
          </p>
        </CardContent>
      </Card>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((category, index) => (
          <Card key={index} className="sleep-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sleep Quality Factors */}
      <Card className="sleep-card">
        <CardHeader>
          <CardTitle className="text-white">影响睡眠质量的因素</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {qualityFactors.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-gray-300">{item.factor}</span>
                <Badge 
                  variant="outline" 
                  className={`${item.color} border-current`}
                >
                  {item.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fun Facts */}
      <Card className="sleep-card border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-white">睡眠小知识 💡</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p>🧠 <strong>深度睡眠</strong>占总睡眠时间的20-25%，是大脑修复的关键时期</p>
              <p>🌙 <strong>REM睡眠</strong>帮助整理记忆和情绪处理</p>
              <p>⏰ <strong>生物钟</strong>受光线影响，蓝光会抑制褪黑激素分泌</p>
            </div>
            <div className="space-y-2">
              <p>🌡️ 体温在晚上会自然下降，帮助入睡</p>
              <p>💤 成年人平均需要<strong>7-9小时</strong>睡眠</p>
              <p>🏃‍♂️ 规律运动可以提高睡眠质量，但避免睡前激烈运动</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};