'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  LayoutDashboard,
  ShoppingCart,
  Cpu,
  Palette,
  MonitorSmartphone,
  MessageCircle,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = [Code2, LayoutDashboard, ShoppingCart, Cpu, Palette, MonitorSmartphone, MessageCircle, Wrench];
const FEATURED_INDEX = 5;

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '-0.02em' }}
          >
            <span style={{ color: '#ffffff' }}>{t.services.title1}</span>
            <span className="gradient-text">{t.services.title2}</span>
          </h2>
          <p style={{ fontSize: 16, color: '#5a7d99', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Grid 4-2-1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.services.cards.map((card, i) => {
            const Icon = ICONS[i];
            const featured = i === FEATURED_INDEX;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: featured
                    ? '1px solid rgba(59,158,255,0.45)'
                    : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: 28,
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                whileHover={{ y: -4 }}
                onMouseEnter={(e) => {
                  if (!featured)
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,158,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  if (!featured)
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(59,158,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b9eff',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#eaf2ff',
                    marginTop: 16,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {card.title}
                </p>

                <p
                  style={{
                    fontSize: 13,
                    color: '#5a7d99',
                    lineHeight: 1.7,
                    marginTop: 8,
                    fontFamily: "'DM Sans', 'Space Grotesk', sans-serif",
                  }}
                >
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
