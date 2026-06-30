import { useState, useEffect, useCallback } from 'react';
import { getIncomes, addIncome, updateIncome, deleteIncome, searchIncomes } from '../../api/incomeApi';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { Plus, Search, Pencil, Trash2, TrendingUp } from 'lucide-react';

const fmt = v => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v||0);
const emptyForm = { title:'', amount:'', description:'', date:'' };

export default function Income() {
  const [incomes, setIncomes]       = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage]             = useState(0);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [modalOpen, setModalOpen]   = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [form, setForm]             = useState(emptyForm);
  const [saving, setSaving]         = useState(false);
  const [deleteId, setDeleteId]     = useState(null);
  const [formError, setFormError]   = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = search ? await searchIncomes(search,page) : await getIncomes(page);
      setIncomes(r.data.content||[]); setTotalPages(r.data.totalPages||0);
    } catch { setIncomes([]); } finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setEditItem(null); setForm(emptyForm); setFormError(''); setModalOpen(true); };
  const openEdit = item => {
    setEditItem(item);
    setForm({ title:item.title, amount:String(item.amount), description:item.description||'', date:item.date });
    setFormError(''); setModalOpen(true);
  };

  const handleSave = async e => {
    e.preventDefault(); setSaving(true); setFormError('');
    try {
      const p = { title:form.title, amount:+form.amount, description:form.description, date:form.date };
      editItem ? await updateIncome(editItem.id,p) : await addIncome(p);
      setModalOpen(false); load();
    } catch(err) { setFormError(err.response?.data?.message||'Failed to save.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    setDeleteId(id);
    try { await deleteIncome(id); load(); } catch{} finally { setDeleteId(null); }
  };

  return (
    <div>
      <PageHeader title="Income" subtitle="Record all your income sources"
        action={<button id="add-income-btn" onClick={openAdd} style={btnPrimary}><Plus size={15}/>Add Income</button>}
      />

      {/* Search */}
      <div style={{ display:'flex', gap:'10px', marginBottom:'18px' }}>
        <form onSubmit={e=>{ e.preventDefault(); setSearch(searchInput); setPage(0); }} style={{ display:'flex', gap:'8px', flex:1, minWidth:'200px' }}>
          <div style={{ position:'relative', flex:1 }}>
            <Search size={14} style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
            <input type="text" placeholder="Search income..." value={searchInput} onChange={e=>setSearchInput(e.target.value)}
              style={{ ...inputSt, paddingLeft:'34px', width:'100%', boxSizing:'border-box' }} />
          </div>
          <button type="submit" style={btnSecondary}>Search</button>
        </form>
        {search && <button onClick={()=>{ setSearch(''); setSearchInput(''); setPage(0); }} style={{ ...btnSecondary, color:'#ef4444', borderColor:'#fecaca' }}>✕ Clear</button>}
      </div>

      <div style={card}>
        {loading ? <SkeletonRows /> : incomes.length===0 ? <EmptyState onAdd={openAdd}/> : (
          <>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                    {['Title','Date','Amount','Description','Actions'].map(h=><th key={h} style={thSt}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {incomes.map(inc=>(
                    <tr key={inc.id} style={{ borderBottom:'1px solid #f8fafc', transition:'background 0.12s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#fafafa'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={tdSt}>
                        <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
                          <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'#ecfdf5', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <TrendingUp size={13} color="#10b981" />
                          </div>
                          <span style={{ fontWeight:600, color:'#1e293b', fontSize:'14px' }}>{inc.title}</span>
                        </div>
                      </td>
                      <td style={{ ...tdSt, color:'#94a3b8', fontSize:'13px' }}>
                        {inc.date ? new Date(inc.date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—'}
                      </td>
                      <td style={{ ...tdSt, color:'#10b981', fontWeight:700, fontSize:'15px' }}>{fmt(inc.amount)}</td>
                      <td style={{ ...tdSt, color:'#94a3b8', fontSize:'13px', maxWidth:'160px' }}>
                        <span style={{ display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{inc.description||'—'}</span>
                      </td>
                      <td style={tdSt}>
                        <div style={{ display:'flex', gap:'6px' }}>
                          <IconBtn onClick={()=>openEdit(inc)} color="#6366f1" bg="#eef2ff"><Pencil size={13}/></IconBtn>
                          <IconBtn onClick={()=>handleDelete(inc.id)} disabled={deleteId===inc.id} color="#ef4444" bg="#fef2f2"><Trash2 size={13}/></IconBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)} title={editItem?'Edit Income':'Add Income'}>
        {formError && <div style={{ padding:'10px 14px', borderRadius:'8px', background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:'13px', marginBottom:'16px' }}>{formError}</div>}
        <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <F label="Title *"><input type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required style={modalInput} placeholder="e.g. Monthly salary" /></F>
          <F label="Amount (₹) *"><input type="number" min="0.01" step="0.01" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} required style={modalInput} placeholder="0.00" /></F>
          <F label="Date *"><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required style={modalInput} /></F>
          <F label="Description"><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{ ...modalInput, resize:'vertical', minHeight:'70px' }} placeholder="Optional note..." /></F>
          <div style={{ display:'flex', gap:'10px' }}>
            <button type="button" onClick={()=>setModalOpen(false)} style={{ ...btnSecondary, flex:1, justifyContent:'center' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ ...btnPrimary, flex:1, justifyContent:'center' }}>
              {saving?'Saving…':editItem?'Update':'Add Income'}
            </button>
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

function IconBtn({ children, onClick, disabled, color, bg }) {
  return <button onClick={onClick} disabled={disabled} style={{ width:'28px', height:'28px', borderRadius:'7px', border:'none', background:bg, display:'flex', alignItems:'center', justifyContent:'center', color, cursor:disabled?'not-allowed':'pointer', opacity:disabled?0.5:1 }}>{children}</button>;
}

function SkeletonRows() {
  return <div style={{ display:'flex', flexDirection:'column', gap:'10px', padding:'8px 0' }}>{[1,2,3,4].map(i=><div key={i} style={{ height:'44px', borderRadius:'8px', background:'#f8fafc', animation:'pulse 1.5s ease-in-out infinite' }}/>)}</div>;
}

function EmptyState({ onAdd }) {
  return <div style={{ textAlign:'center', padding:'48px 24px' }}>
    <TrendingUp size={44} color="#cbd5e1" style={{ marginBottom:'12px' }} />
    <p style={{ color:'#94a3b8', margin:'0 0 20px' }}>No income records found</p>
    <button onClick={onAdd} style={btnPrimary}><Plus size={14}/>Add your first income</button>
  </div>;
}

const card       = { background:'#ffffff', borderRadius:'16px', padding:'20px', boxShadow:'0 1px 3px rgba(15,23,42,0.07)', border:'1px solid #f1f5f9' };
const inputSt    = { padding:'9px 12px', borderRadius:'9px', border:'1.5px solid #e2e8f0', background:'#ffffff', color:'#1e293b', fontSize:'13px', outline:'none' };
const modalInput = { width:'100%', padding:'10px 13px', borderRadius:'9px', border:'1.5px solid #e2e8f0', background:'#ffffff', color:'#1e293b', fontSize:'14px', outline:'none', boxSizing:'border-box' };
const thSt       = { padding:'10px 16px', textAlign:'left', fontSize:'11px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.6px' };
const tdSt       = { padding:'13px 16px', fontSize:'14px', color:'#334155' };
const btnPrimary  = { display:'flex', alignItems:'center', gap:'6px', padding:'10px 18px', borderRadius:'9px', border:'none', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'white', fontSize:'14px', fontWeight:600, cursor:'pointer', boxShadow:'0 3px 10px rgba(99,102,241,0.3)', whiteSpace:'nowrap' };
const btnSecondary = { display:'flex', alignItems:'center', gap:'6px', padding:'9px 14px', borderRadius:'9px', border:'1.5px solid #e2e8f0', background:'#ffffff', color:'#64748b', fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' };
