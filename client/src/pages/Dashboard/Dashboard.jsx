import { useState, useEffect, useCallback } from 'react';
import { getDashboard } from '../../api/dashboardApi';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Wallet, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const PIE_COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#3b82f6','#ec4899','#14b8a6'];
const fmt = v => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v||0);

export default function Dashboard() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear]   = useState(now.getFullYear());
  const [data, setData]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setLoading(true); setError('');
    try { const r = await getDashboard(month, year); setData(r.data); }
    catch { setError('Failed to load dashboard data.'); }
    finally { setLoading(false); }
  }, [month, year]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const barData = data ? [{ name: MONTHS[month-1].slice(0,3), Income: +data.totalIncome||0, Expenses: +data.totalExpense||0 }] : [];
  const pieData = (data?.budgetAnalytics||[]).map((b,i)=>({ name: b.categoryName, value: +b.spentAmount||0, color: PIE_COLORS[i%PIE_COLORS.length] })).filter(d=>d.value>0);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Financial overview for ${MONTHS[month-1]} ${year}`}
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <select value={month} onChange={e=>setMonth(+e.target.value)} style={selectStyle}>
              {MONTHS.map((m,i) => <option key={m} value={i+1}>{m}</option>)}
            </select>
            <select value={year} onChange={e=>setYear(+e.target.value)} style={selectStyle}>
              {[2024,2025,2026,2027].map(y=><option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        }
      />

      {loading ? <Skeleton /> : error ? <ErrorBox msg={error} retry={fetchDashboard} /> : (
        <>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '24px' }}>
            <StatCard title="Total Income"    value={fmt(data?.totalIncome)}    icon={TrendingUp}   color="emerald" subtitle={`${MONTHS[month-1]} ${year}`} />
            <StatCard title="Total Expenses"  value={fmt(data?.totalExpense)}   icon={TrendingDown} color="rose"    subtitle={`${MONTHS[month-1]} ${year}`} />
            <StatCard title="Remaining Balance" value={fmt(data?.remainingBalance)} icon={Wallet} color={+data?.remainingBalance>=0?'indigo':'rose'} subtitle="After all expenses" />
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            {/* Bar */}
            <div style={card}>
              <div style={cardTitle}>Income vs Expenses</div>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={barData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 13 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 4px 16px rgba(15,23,42,0.1)', color: '#0f172a' }} formatter={v=>fmt(v)} />
                  <Bar dataKey="Income"   fill="#10b981" radius={[6,6,0,0]} />
                  <Bar dataKey="Expenses" fill="#ef4444" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie */}
            {pieData.length > 0 ? (
              <div style={card}>
                <div style={cardTitle}>Spending by Category</div>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                      {pieData.map((e,i)=><Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:'10px', color:'#0f172a' }} formatter={v=>fmt(v)} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:'12px', color:'#64748b' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ ...card, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'8px' }}>
                <Calendar size={36} color="#cbd5e1" />
                <span style={{ fontSize:'14px', color:'#94a3b8' }}>No spending data yet</span>
              </div>
            )}
          </div>

          {/* Budget Tracker */}
          {data?.budgetAnalytics?.length > 0 && (
            <div style={card}>
              <div style={{ ...cardTitle, marginBottom: '20px' }}>Budget Tracker</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {data.budgetAnalytics.map((b,i) => {
                  const pct = Math.min(+(b.usagePercentage||0), 100);
                  const exceeded = b.budgetExceeded;
                  const barColor = exceeded ? '#ef4444' : pct > 75 ? '#f59e0b' : '#10b981';
                  return (
                    <div key={i}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                          {exceeded
                            ? <AlertTriangle size={14} color="#ef4444" />
                            : <CheckCircle size={14} color="#10b981" />
                          }
                          <span style={{ fontSize:'14px', fontWeight:600, color:'#1e293b' }}>{b.categoryName}</span>
                          {exceeded && <span style={{ fontSize:'10px', padding:'2px 8px', borderRadius:'20px', background:'#fef2f2', border:'1px solid #fecaca', color:'#ef4444', fontWeight:700 }}>EXCEEDED</span>}
                        </div>
                        <span style={{ fontSize:'13px', color:'#64748b' }}>
                          <span style={{ color: barColor, fontWeight:700 }}>{fmt(b.spentAmount)}</span>
                          {' / '}{fmt(b.monthlyLimit)}
                        </span>
                      </div>
                      <div style={{ height:'8px', borderRadius:'100px', background:'#f1f5f9', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${pct}%`, borderRadius:'100px', background: barColor, transition:'width 0.6s ease' }} />
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                        <span style={{ fontSize:'11px', color:'#94a3b8' }}>{pct.toFixed(1)}% used</span>
                        <span style={{ fontSize:'11px', color:'#94a3b8' }}>
                          {exceeded ? `Over by ${fmt(Math.abs(b.remainingAmount))}` : `${fmt(b.remainingAmount)} left`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!data?.budgetAnalytics?.length && (
            <div style={{ ...card, textAlign:'center', padding:'40px 24px', color:'#94a3b8' }}>
              <Calendar size={36} style={{ marginBottom:'10px', opacity:0.4 }} />
              <p style={{ margin:0, fontSize:'14px' }}>No budgets set for this month. Go to Budgets to add them.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
      {[1,2,3].map(i=>(
        <div key={i} style={{ height:'120px', borderRadius:'16px', background:'#f1f5f9', animation:'pulse 1.5s ease-in-out infinite' }} />
      ))}
    </div>
  );
}

function ErrorBox({ msg, retry }) {
  return (
    <div style={{ ...card, textAlign:'center', padding:'40px' }}>
      <p style={{ color:'#ef4444', marginBottom:'16px' }}>{msg}</p>
      <button onClick={retry} style={btnPrimary}>Retry</button>
    </div>
  );
}

const card = { background:'#ffffff', borderRadius:'16px', padding:'24px', boxShadow:'0 1px 3px rgba(15,23,42,0.07)', border:'1px solid #f1f5f9' };
const cardTitle = { fontSize:'15px', fontWeight:700, color:'#0f172a', marginBottom:'4px' };
const selectStyle = { padding:'8px 12px', borderRadius:'8px', border:'1.5px solid #e2e8f0', background:'#ffffff', color:'#334155', fontSize:'13px', cursor:'pointer', outline:'none' };
const btnPrimary = { padding:'10px 24px', borderRadius:'8px', border:'none', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'white', fontSize:'14px', fontWeight:600, cursor:'pointer' };
