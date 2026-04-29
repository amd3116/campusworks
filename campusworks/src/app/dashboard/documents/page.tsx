'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { DOCUMENTS } from '@/lib/data'
import { Badge, Modal, Toast, PageHeader } from '@/components/ui'
import type { Document } from '@/types'

export default function DocumentsPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const isStudent = user?.role === 'student'

  const [docs, setDocs] = useState<Document[]>(
    isStudent ? DOCUMENTS.filter(d => d.relatedTo.includes('Aisha')) : DOCUMENTS
  )
  const [showUpload, setShowUpload] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ name: '', type: 'Supporting' as Document['type'], relatedTo: 'Aisha Rahman' })

  function upload() {
    const newDoc: Document = {
      id: `DOC-00${docs.length + 1}`,
      ...form,
      uploadedBy: user?.name || 'HR',
      date: new Date().toISOString().split('T')[0],
      status: 'active',
    }
    setDocs(ds => [newDoc, ...ds])
    setShowUpload(false)
    setToast('Document uploaded. HR/Department notified.')
  }

  const typeIcon: Record<string, string> = { Contract: '📋', Approval: '✅', Supporting: '📎', ID: '🪪' }

  return (
    <div>
      <PageHeader
        title="Document Repository"
        subtitle="Digital contracts, approvals & supporting documents"
        action={!isStudent ? <button className="btn-primary" onClick={() => setShowUpload(true)}>+ Upload Document</button> : undefined}
      />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {['All','Contract','Approval','Supporting','ID'].map(type => (
          <span key={type} className="badge bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 px-3 py-1">{type}</span>
        ))}
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header">Document</th>
                <th className="table-header">Type</th>
                <th className="table-header">Related To</th>
                <th className="table-header">Uploaded By</th>
                <th className="table-header">Date</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {docs.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <span>{typeIcon[d.type] || '📄'}</span>
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${d.type === 'Contract' ? 'bg-blue-100 text-blue-700' : d.type === 'Approval' ? 'bg-green-100 text-green-700' : d.type === 'ID' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{d.type}</span>
                  </td>
                  <td className="table-cell text-gray-600">{d.relatedTo}</td>
                  <td className="table-cell text-gray-500">{d.uploadedBy}</td>
                  <td className="table-cell text-gray-400">{d.date}</td>
                  <td className="table-cell"><Badge status={d.status} /></td>
                  <td className="table-cell">
                    <div className="flex gap-1.5">
                      <button className="btn-secondary text-xs py-1.5 px-3">View</button>
                      <button className="btn-secondary text-xs py-1.5 px-3">⬇ Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showUpload} title="Upload Document" onClose={() => setShowUpload(false)}
        footer={<><button className="btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button><button className="btn-primary" onClick={upload}>Upload</button></>}>
        <div className="space-y-3">
          <div><label className="label">Document Name</label><input className="input" placeholder="e.g. Employment Contract – John Doe" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div>
            <label className="label">Type</label>
            <select className="select" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value as any}))}>
              {['Contract','Approval','Supporting','ID'].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Related To</label>
            <select className="select" value={form.relatedTo} onChange={e=>setForm(f=>({...f,relatedTo:e.target.value}))}>
              {['Aisha Rahman','Nadia Chowdhury','Rafiq Islam','CS Department','Physics Department'].map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Upload File</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="text-3xl mb-2">📎</div>
              <div className="text-sm">Click to browse or drag & drop</div>
              <div className="text-xs mt-1">PDF, DOC, DOCX up to 10MB</div>
            </div>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}
