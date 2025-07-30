import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SleepDashboard } from '@/components/SleepDashboard';
import { SleepTips } from '@/components/SleepTips';
import { BarChart3, Lightbulb, Home } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Tabs defaultValue="dashboard" className="w-full">
        {/* Navigation */}
        <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-800/50 border border-gray-700">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">仪表盘</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">分析</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tips"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">建议</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <TabsContent value="dashboard" className="mt-0">
          <SleepDashboard />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0 p-6">
          <SleepDashboard />
        </TabsContent>
        
        <TabsContent value="tips" className="mt-0 p-6">
          <SleepTips />
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  );
};

export default Index;