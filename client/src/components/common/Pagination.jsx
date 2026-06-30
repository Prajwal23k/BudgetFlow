import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '20px' }}>
      <PgBtn onClick={() => onPageChange(page - 1)} disabled={page === 0}>
        <ChevronLeft size={15} />
      </PgBtn>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let n = totalPages <= 5 ? i : page < 3 ? i : page >= totalPages - 3 ? totalPages - 5 + i : page - 2 + i;
        return (
          <button key={n} onClick={() => onPageChange(n)} style={{
            width: '34px', height: '34px', borderRadius: '8px', fontSize: '14px',
            fontWeight: n === page ? 700 : 400, cursor: 'pointer', transition: 'all 0.15s',
            border: n === page ? 'none' : '1px solid #e2e8f0',
            background: n === page ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#ffffff',
            color: n === page ? 'white' : '#64748b',
            boxShadow: n === page ? '0 2px 8px rgba(99,102,241,0.35)' : 'none',
          }}>
            {n + 1}
          </button>
        );
      })}
      <PgBtn onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}>
        <ChevronRight size={15} />
      </PgBtn>
    </div>
  );
}

function PgBtn({ children, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '34px', height: '34px', borderRadius: '8px',
      border: '1px solid #e2e8f0', background: '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? '#cbd5e1' : '#64748b', transition: 'all 0.15s',
    }}>
      {children}
    </button>
  );
}
