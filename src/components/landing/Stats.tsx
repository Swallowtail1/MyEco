"use client";
const stats = [
  {
    title: "CO₂ Saved",
    value: "12.5 Ton",
  },
  {
    title: "Active Users",
    value: "2,450+",
  },
  {
    title: "Challenges Completed",
    value: "8,920",
  },
  {
    title: "Plastic Reduced",
    value: "14K+",
  },
];



import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="py-20 px-6">
      <motion.div
      initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our Impact In Numbers
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Bersama komunitas, kita telah melangkah jauh untuk menjaga bumi. 
            Inilah kontribusi nyata yang berhasil kita kumpulkan bersama.
          </p>
        </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
          >
            <h3 className="text-3xl font-bold text-green-400 mb-2">
              {item.value}
            </h3>

            <p className="text-gray-400">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}