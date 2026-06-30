import { useState, useEffect, useCallback } from 'react';
import { getBudgets, addBudget, deleteBudget } from '../../api/budgetApi';
import { getCategories } from '../../api/categoryApi';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { Plus, Trash2, Wallet } from 'lucide-react';

const fmt = v => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v||0);
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const FULL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const emptyForm = { monthlyLimit:'', month:String(new Date().getMonth()+1), year:String(new Date().getFullYear()), categoryId:'' };

const CAT_COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#3b82f6','#ec4899','#14b8a6'];

export default function Budgets() {
  const [budgets, setBudgets]       = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage]             = useState(0);
  const [loading, setLoading]       = useState(true);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen]   = useState(false);
  const [form, setForm]             = useState(emptyForm);
  const [saving, setSaving]         = useState(false);
  const [deleteId, setDeleteId]     = useState(null);
  const [formError, setFormError]   = useState('');

  useEffect(() => { getCategories().then(r=>setCategories(r.data||[])).catch(()=>setCategories([])); }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await getBudgets(page); setBudgets(r.data.content||[]); setTotalPages(r.data.totalPages||0); }
    catch { setBudgets([]); } finally { setLoading(false); }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async e => {
    e.preventDefault(); setSaving(true); setFormError('');
    try {
      await addBudget({ monthlyLimit:+form.monthlyLimit, month:+form.month, year:+form.year, categoryId:+form.categoryId });
      setModalOpen(false); load();
    } catch(err) { setFormError(err.response?.data?.message||'Failed to save budget.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    setDeleteId(id);
    try { await deleteBudget(id); load(); } catch{} finally { setDeleteId(null); }
  };

  return (
    <div>
      <PageHeader title="Budgets" subtitle="Set monthly spending limits per category"
        action={<button id="add-budget-btn" onClick={()=>{ setForm(emptyForm); setFormError(''); setModalOpen(true); }} style={btnPrimary}><Plus size={15}/>Set Budget</button>}
      />

      {loading ? <SkeletonCards /> : budgets.length===0 ? <EmptyState onAdd={()=>{ setForm(emptyForm); setFormError(''); setModalOpen(true); }}/> : (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'16px', marginBottom:'20px' }}>
            {budgets.map((b,i) => {
              const color = CAT_COLORS[i % CAT_COLORS.length];
              const soft  = color + '18';
              return (
                <div key={b.id} style={{
                  background:'#ffffff', borderRadius:'16px', padding:'22px',
                  boxShadow:'0 1px 3px rgba(15,23,42,0.07)', border:'1px solid #f1f5f9',
                  transition:'transform 0.18s, box-shadow 0.18s', overflow:'hidden', position:'relative',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(15,23,42,0.1)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(15,23,42,0.07)'; }}
                >
                  {/* Top accent line */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:color }} />

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:'4px' }}>
                    <div>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'3px 10px', borderRadius:'20px', background:soft, marginBottom:'8px' }}>
                        <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:color }} />
                        <span style={{ fontSize:'12px', fontWeight:700, color }}>{b.categoryName||'—'}</span>
                      </div>
                      <div style={{ fontSize:'12px', color:'#94a3b8' }}>{FULL_MONTHS[(b.month||1)-1]} {b.year}</div>
                    </div>
                    <button onClick={()=>handleDelete(b.id)} disabled={deleteId===b.id} style={{ width:'28px', height:'28px', borderRadius:'7px', border:'none', background:'#fef2f2', display:'flex', alignItems:'center', justifyContent:'center', color:'#ef4444', cursor:deleteId===b.id?'not-allowed':'pointer', opacity:deleteId===b.id?0.5:1 }}
                      onMouseEnter={e=>e.currentTarget.style.background='#fee2e2'}
                      onMouseLeave={e=>e.currentTarget.style.background='#fef2f2'}
                    ><Trash2 size={13}/></button>
                  </div>

                  <div style={{ marginTop:'14px' }}>
                    <div style={{ fontSize:'11px', color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'4px' }}>Monthly Limit</div>
                    <div style={{ fontSize:'24px', fontWeight:800, color:'#0f172a', letterSpacing:'-0.5px' }}>{fmt(b.monthlyLimit)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)} title="Set Budget">
        {formError && <div style={{ padding:'10px 14px', borderRadius:'8px', background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:'13px', marginBottom:'16px' }}>{formError}</div>}
        <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <F label="Category *">
            <select value={form.categoryId} onChange={e=>setForm({...form,categoryId:e.target.value})} required style={modalInput}>
              <option value="">Select category</option>
              {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </F>
          <F label="Monthly Limit (₹) *"><input type="number" min="1" step="1" value={form.monthlyLimit} onChange={e=>setForm({...form,monthlyLimit:e.target.value})} required style={modalInput} placeholder="e.g. 5000" /></F>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <F label="Month *">
              <select value={form.month} onChange={e=>setForm({...form,month:e.target.value})} required style={modalInput}>
                {MONTHS.map((m,i)=><option key={m} value={i+1}>{m}</option>)}
              </select>
            </F>
            <F label="Year *">
              <select value={form.year} onChange={e=>setForm({...form,year:e.target.value})} required style={modalInput}>
                {[2024,2025,2026,2027].map(y=><option key={y} value={y}>{y}</option>)}
              </select>
            </F>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <button type="button" onClick={()=>setModalOpen(false)} style={{ ...btnSecondary, flex:1, justifyContent:'center' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ ...btnPrimary, flex:1, justifyContent:'center' }}>{saving?'Saving…':'Set Budget'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const F = ({ label, children }) => (
  <div>
    <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.4px' }}>{label}</label>
    {children}
  </div>
);

function SkeletonCards() {
  return <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'16px' }}>{[1,2,3].map(i=><div key={i} style={{ height:'140px', borderRadius:'16px', background:'#f8fafc', animation:'pulse 1.5s ease-in-out infinite' }}/>)}</div>;
}

function EmptyState({ onAdd }) {
  return <div style={{ textAlign:'center', padding:'64px 24px', background:'#ffffff', borderRadius:'16px', border:'1px solid #f1f5f9', boxShadow:'0 1px 3px rgba(15,23,42,0.06)' }}>
    <Wallet size={44} color="#cbd5e1" style={{ marginBottom:'12px' }} />
    <p style={{ color:'#94a3b8', margin:'0 0 20px' }}>No budgets set yet</p>
    <button onClick={onAdd} style={btnPrimary}><Plus size={14}/>Set your first budget</button>
  </div>;
}

const modalInput  = { width:'100%', padding:'10px 13px', borderRadius:'9px', border:'1.5px solid #e2e8f0', background:'#ffffff', color:'#1e293b', fontSize:'14px', outline:'none', boxSizing:'border-box' };
const btnPrimary  = { display:'flex', alignItems:'center', gap:'6px', padding:'10px 18px', borderRadius:'9px', border:'none', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'white', fontSize:'14px', fontWeight:600, cursor:'pointer', boxShadow:'0 3px 10px rgba(99,102,241,0.3)', whiteSpace:'nowrap' };
const btnSecondary = { display:'flex', alignItems:'center', gap:'6px', padding:'9px 14px', borderRadius:'9px', border:'1.5px solid #e2e8f0', background:'#ffffff', color:'#64748b', fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' };
