"use client"

import { Loader2, Hammer, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white invert">
      {/* Animated Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white w-[90%] max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
              className="inline-block"
            >
              <Hammer className="h-16 w-16 text-white mx-auto" />
            </motion.div>
            <CardTitle className="text-3xl font-bold mt-4">We're Building Something Amazing!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-white/90 text-lg mb-4">
              Our website is currently under construction. Stay tuned for updates!
            </p>
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              <Loader2 className="h-10 w-10 animate-spin mx-auto text-white" />
            </motion.div>
            <p className="text-sm text-white/70 mt-4 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              Estimated Launch: Coming Soon 🚀
            </p>
            <div className="mt-6">
              <Button className="bg-white text-black hover:bg-gray-200">Notify Me</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
