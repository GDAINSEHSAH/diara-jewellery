"use client";

import { useState } from "react";
import { useAuth, Address } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const emptyAddress = {
  label: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AccountAddressesPage() {
  const { user, addAddress, updateAddress, deleteAddress } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAddress);

  const handleSave = () => {
    if (!form.label || !form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      addToast("error", "Please fill all fields");
      return;
    }
    if (editing) {
      updateAddress(editing, form);
      addToast("success", "Address updated");
    } else {
      addAddress(form);
      addToast("success", "Address added");
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyAddress);
  };

  const startEdit = (addr: Address) => {
    setForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setEditing(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
    addToast("info", "Address removed");
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-playfair text-2xl text-stone-800">My Addresses</h1>
        {!showForm && (
          <button
            onClick={() => {
              setForm(emptyAddress);
              setEditing(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-full hover:bg-stone-700 transition-colors"
          >
            + Add Address
          </button>
        )}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="bg-stone-50 rounded-xl p-6 mb-6">
          <h3 className="font-medium text-stone-800 mb-4">
            {editing ? "Edit Address" : "Add New Address"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Label</label>
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="e.g. Home, Office"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Pincode</label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                className="accent-stone-800"
              />
              <label htmlFor="isDefault" className="text-sm text-stone-600">Set as default</label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-full hover:bg-stone-700 transition-colors"
            >
              {editing ? "Update" : "Save"} Address
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setForm(emptyAddress);
              }}
              className="px-6 py-2.5 border border-stone-200 text-stone-600 text-sm rounded-full hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      {!user?.addresses?.length && !showForm ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-stone-500 font-medium">No addresses saved</p>
          <p className="text-stone-400 text-sm mt-1">Add an address for faster checkout</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {user?.addresses?.map((addr) => (
            <div
              key={addr.id}
              className={`rounded-xl border p-5 ${
                addr.isDefault ? "border-stone-800 bg-stone-50" : "border-stone-100"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-stone-800">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-medium bg-stone-800 text-white px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(addr)}
                    className="text-xs text-stone-500 hover:text-stone-700 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-xs text-red-500 hover:text-red-700 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-stone-600">
                {addr.name}<br />
                {addr.address}<br />
                {addr.city}, {addr.state} - {addr.pincode}<br />
                {addr.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
