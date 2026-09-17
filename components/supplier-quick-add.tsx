"use client";

import { FormEvent, useState } from "react";
import { X, Truck } from "lucide-react";
import { db, ModuleRecord } from "@/lib/db";
import { logAction } from "@/lib/logger";

const EMPTY_FORM = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
};

interface SupplierQuickAddProps {
  open: boolean;
  onClose: () => void;
  onCreated: (supplier: ModuleRecord) => void;
}

export function SupplierQuickAdd({ open, onClose, onCreated }: SupplierQuickAddProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const close = () => {
    if (saving) return;
    setForm(EMPTY_FORM);
    onClose();
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || !phone) return alert("Company name and phone are required.");

    setSaving(true);
    try {
      const now = new Date();
      const record: ModuleRecord = {
        module: "supplier",
        title: name,
        status: "Active",
        data: {
          name,
          contactPerson: form.contactPerson.trim(),
          phone,
          email: form.email.trim(),
          address: form.address.trim(),
        },
        createdAt: now,
        updatedAt: now,
      };

      const insertedId = await db.moduleRecords.add(record);
      const createdSupplier: ModuleRecord = {
        ...record,
        id: Number(insertedId),
      };

      await logAction("Suppliers", `Added new vendor: ${name} (quick add)`);
      setForm(EMPTY_FORM);
      onCreated(createdSupplier);
    } catch (err) {
      console.error(err);
      alert("Could not save this supplier. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-6" onClick={close}>
      <div className="bg-white w-full max-w-md max-h-[85vh] overflow-y-auto no-scrollbar rounded-xl shadow-high p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={close} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900" title="Close"><X size={24} /></button>
        <h2 className="text-lg font-black text-slate-900 tracking-tighter mb-1 flex items-center gap-2"><Truck size={20} className="text-primary" />Quick-Add Supplier</h2>
        <p className="text-xs text-slate-400 font-bold mb-6">Register the vendor without leaving this order.</p>
        <form onSubmit={save} className="space-y-4">
          <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Company Name</label><input required autoFocus className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Phone</label><input required className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Contact Person (optional)</label><input className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} /></div>
          <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Email (optional)</label><input type="email" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Address (optional)</label><textarea className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
          <div className="flex gap-2 pt-2"><button type="submit" disabled={saving} className="flex-1 bg-primary text-white py-3.5 rounded-2xl font-black shadow-high shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-widest text-xs">{saving ? "Saving..." : "Save & Select"}</button><button type="button" onClick={close} disabled={saving} className="px-5 rounded-2xl border border-slate-100 font-black text-slate-500 text-xs uppercase tracking-widest">Cancel</button></div>
        </form>
      </div>
    </div>
  );
}
