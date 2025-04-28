"use client";

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const LeetCodeProgressCircle = ({ 
  solvedProblems = {
    easy: 50,
    medium: 120,
    hard: 30,
    total: 200
  }
}) => {
  const data = [
    { name: 'Easy', value: solvedProblems.easy, color: '#5CB85C' },
    { name: 'Medium', value: solvedProblems.medium, color: '#F0AD4E' },
    { name: 'Hard', value: solvedProblems.hard, color: '#D9534F' }
  ];

  return (
    <div className="flex flex-col items-center p-4  rounded-lg">
      <div className="relative">
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx={125}
            cy={125}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold">{solvedProblems.total}</div>
          <div className="text-sm text-gray-600">Total Problems</div>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center">
            <div 
              className="w-4 h-4 mr-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeetCodeProgressCircle;