import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { FlowerImage } from '@/types/types'

interface MessageComposerProps {
  selectedImage: FlowerImage | null
  onSubmit: (message: string) => void
  onBack: () => void
}

const MessageComposer = ({ selectedImage, onSubmit, onBack }: MessageComposerProps) => {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message)
    }
  }

  if (!selectedImage) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">画像が選択されていません。戻って花を選んでください。</p>
        <button onClick={onBack} className="btn-primary mt-4">
          戻る
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif text-complement-800 mb-6 text-center">
        メッセージを書く
      </h2>
      
      <p className="text-center text-complement-600 mb-8">
        選んだ花に心のこもったメッセージを添えましょう。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="message-card h-80 md:h-96 overflow-hidden"
        >
          <img 
            src={selectedImage.src.portrait} 
            alt={selectedImage.alt || '選んだ花'} 
            className="object-cover w-full h-full"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`textarea-container border-2 rounded-lg p-4 transition-all duration-300 
              ${isFocused ? 'border-primary-500 shadow-md' : 'border-gray-200'}`}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="心のこもったメッセージを書いてください..."
                className="w-full h-48 resize-none focus:outline-none font-serif"
                required
              />
            </div>
            
            <div className="flex justify-between mt-4">
              <button 
                type="button" 
                onClick={onBack}
                className="btn-secondary flex items-center"
              >
                <FaArrowLeft className="mr-2" /> 戻る
              </button>
              
              <button 
                type="submit"
                className="btn-primary flex items-center"
                disabled={!message.trim()}
              >
                次へ <FaArrowRight className="ml-2" />
              </button>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-complement-700 mb-2">メッセージのヒント：</h3>
            <ul className="text-sm text-complement-600 space-y-2">
              <li>• 心から感じていることを素直に伝えましょう</li>
              <li>• 二人だけの思い出や内緒話を入れると特別感が増します</li>
              <li>• 相手の特別なところを具体的に伝えましょう</li>
              <li>• 二人の関係に合った温かい結びの言葉で締めくくりましょう</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MessageComposer