"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const AREA = [
  { m:"Aug", contacts:8,  apps:5  },
  { m:"Sep", contacts:12, apps:9  },
  { m:"Oct", contacts:10, apps:7  },
  { m:"Nov", contacts:18, apps:14 },
  { m:"Dec", contacts:15, apps:11 },
  { m:"Jan", contacts:22, apps:18 },
  { m:"Feb", contacts:28, apps:22 },
];

const PIE = [
  { name:"Web Dev",  value:42, color:"#0ea5e9" },
  { name:"Mobile",   value:22, color:"#a855f7" },
  { name:"AI/ML",    value:18, color:"#22c55e" },
  { name:"Design",   value:10, color:"#f97316" },
  { name:"Cloud",    value:8,  color:"#06b6d4" },
];

const TT = { contentStyle: { background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:"12px", fontSize:"12px" } };

export function DashCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6">
        <h3 className="font-semibold mb-6 text-[var(--text)]">Contacts & Applications (7 months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={AREA}>
            <defs>
              <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="m" stroke="var(--muted)" tick={{fontSize:12}} />
            <YAxis stroke="var(--muted)" tick={{fontSize:12}} />
            <Tooltip {...TT} />
            <Area type="monotone" dataKey="contacts" stroke="#0ea5e9" fill="url(#gc)" strokeWidth={2} name="Contacts" />
            <Area type="monotone" dataKey="apps"     stroke="#a855f7" fill="url(#ga)" strokeWidth={2} name="Applications" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6">
        <h3 className="font-semibold mb-4 text-[var(--text)]">Services Breakdown</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
              {PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip {...TT} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {PIE.map(item => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{background:item.color}} />
                <span className="text-[var(--text2)]">{item.name}</span>
              </div>
              <span className="font-semibold text-[var(--text)]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
