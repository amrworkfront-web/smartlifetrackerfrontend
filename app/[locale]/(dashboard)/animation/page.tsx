"use client";
import {  motion } from "framer-motion";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  tap: { scale: 0.97 },
};
export default function Page() {
  return (
    <motion.div className=" bg-gray-400 flex flex-col items-center justify-center h-screen text-2xl font-bold gap-9">
      <div className="flex gap-4">
        <motion.p
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          welcome back
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Amr
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Mousa
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          lats statart
        </motion.p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.9, y: 1 }}
        transition={{ type: "spring", damping: 5 }}
        className="bg-black text-white px-8 py-2 rounded-xl border hover:cursor-pointer border-gray-500"
      >
        test
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.9, y: 1 }}
        transition={{ type: "decay" }}
        className="bg-black text-white px-8 py-2 rounded-xl border hover:cursor-pointer border-gray-500"
      >
        test
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.9, y: 1 }}
        className="bg-black text-white px-8 py-2 rounded-xl border hover:cursor-pointer border-gray-500"
      >
        test
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.9, y: 1 }}
        transition={{ type: "spring" }}
        className="bg-black text-white px-8 py-2 rounded-xl border hover:cursor-pointer border-gray-500"
      >
        test
      </motion.button>
      <motion.ul variants={listVariants} initial="hidden" animate="visible">
        <motion.li variants={itemVariants}>Item 1</motion.li>
        <motion.li drag variants={itemVariants}>Item 2</motion.li>
        <motion.li variants={itemVariants}>Item 3</motion.li>
        <motion.li variants={itemVariants}>Item 1</motion.li>
        <motion.li variants={itemVariants}>Item 2</motion.li>
        <motion.li variants={itemVariants}>Item 3</motion.li>
        <motion.li variants={itemVariants}>Item 1</motion.li>
        <motion.li variants={itemVariants}>Item 2</motion.li>
        <motion.li variants={itemVariants}>Item 3</motion.li>
      </motion.ul>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        Card Content
      </motion.div>
    </motion.div>
  );
}
