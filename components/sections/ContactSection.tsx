'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail, Phone, MapPin, Loader2 } from 'lucide-react'

const services = [
  'Full Stack Development',
  'Mobile App Development',
  'UI/UX Design',
  'AI Solutions',
  'Digital Marketing',
  'SEO Optimization',
  'Cloud Solutions',
  'IT Consulting',
]

const budgets = ['Under $10K', '$10K – $25K', '$25K – $50K', '$50K – $100K', '$100K+']

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim() || form.message.length < 20) e.message = 'Please describe your project (min 20 chars)'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setSubmitted(true)
  }

  const inputBase = `w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm outline-none transition-all duration-300`

  const inputClass = (field: string) =>
    `${inputBase} ${
      focused === field
        ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
        : errors[field]
        ? 'border-red-500/50'
        : 'border-white/10 hover:border-white/20'
    }`

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">Start a Conversation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Let&apos;s Build Something
            <span className="text-gradient"> Exceptional</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tell us about your vision. We&apos;ll respond within 24 hours with a detailed plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Get in Touch</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We work with companies globally and are always looking for the next great challenge to take on.
              </p>
            </div>

            {[
              { icon: Mail, label: 'Email', value: 'hello@nexusdigital.io', color: '#3B82F6' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', color: '#8B5CF6' },
              { icon: MapPin, label: 'HQ', value: 'San Francisco, CA & Remote', color: '#06B6D4' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ backgroundColor: item.color + '15', border: `1px solid ${item.color}25` }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-0.5">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </motion.div>
              )
            })}

            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-500 text-xs mb-4">Average Response Time</p>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-300 text-sm font-medium">Within 4 business hours</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-3xl p-12 border border-green-500/20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={40} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you within 24 hours. Check your inbox for a confirmation email.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-card rounded-3xl p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-2 block">Full Name *</label>
                      <input
                        className={inputClass('name')}
                        placeholder="John Smith"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-2 block">Email Address *</label>
                      <input
                        className={inputClass('email')}
                        placeholder="john@company.com"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-2 block">Phone Number</label>
                      <input
                        className={inputClass('phone')}
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-2 block">Budget Range</label>
                      <select
                        className={`${inputClass('budget')} cursor-pointer`}
                        value={form.budget}
                        onChange={e => setForm({ ...form, budget: e.target.value })}
                        onFocus={() => setFocused('budget')}
                        onBlur={() => setFocused(null)}
                      >
                        <option value="" disabled>Select budget...</option>
                        {budgets.map(b => (
                          <option key={b} value={b} className="bg-gray-900">{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-400 mb-2 block">Service Required *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {services.map(service => (
                        <motion.button
                          key={service}
                          type="button"
                          onClick={() => setForm({ ...form, service })}
                          whileTap={{ scale: 0.95 }}
                          className={`text-xs px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                            form.service === service
                              ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                          }`}
                        >
                          {service}
                        </motion.button>
                      ))}
                    </div>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-400 mb-2 block">Project Details *</label>
                    <textarea
                      className={`${inputClass('message')} resize-none h-28`}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-70"
                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
