import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCopy, FaCheck, FaShareAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { FlowerImage } from '@/types/types'

interface LinkGeneratorProps {
  generatedLink: string
  selectedImage: FlowerImage | null
  message: string
  onBack: () => void
}

const LinkGenerator = ({ generatedLink, selectedImage, message, onBack }: LinkGeneratorProps) => {
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const linkRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.focus()
      linkRef.current.select()
    }
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setCopied(true)
        toast.success('リンクをクリップボードにコピーしました！')
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        toast.error('リンクのコピーに失敗しました')
      })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'あなたへの花のメッセージ',
          text: '美しい花とメッセージを送りました',
          url: generatedLink
        })
        toast.success('共有に成功しました！')
      } catch (error) {
        console.error('共有エラー:', error)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-serif text-complement-800 mb-4">
          花のメッセージが完成しました！
        </h2>
        
        <p className="text-complement-600 mb-8">
          大切な人にこのリンクを送って、花とメッセージで幸せな気持ちを届けましょう。
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md mb-8">
          <div className="flex items-center mb-6">
            <input
              ref={linkRef}
              type="text"
              value={generatedLink}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
            />
            <button
              onClick={handleCopyLink}
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-3 rounded-r-lg transition-colors duration-300 flex items-center justify-center min-w-[100px]"
            >
              {copied ? (
                <>
                  <FaCheck className="mr-2" /> コピー済み
                </>
              ) : (
                <>
                  <FaCopy className="mr-2" /> copy
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={handleShare}
              className="btn-primary flex items-center justify-center"
            >
              <FaShareAlt className="mr-2" /> 共有
            </button>
            
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary"
            >
              {showPreview ? 'プレビューを隠す' : 'プレビューを見る'}
            </button>
          </div>
        </div>
        
        {showPreview && selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="message-card overflow-hidden max-w-md mx-auto mb-8"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={selectedImage.src.portrait} 
                alt="選んだ花" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6 bg-white">
              <p className="font-serif text-complement-700 whitespace-pre-wrap">{message}</p>
              <p className="text-sm text-complement-500 mt-4 text-right italic">
                写真: {selectedImage.photographer}
              </p>
            </div>
          </motion.div>
        )}
        
        <button 
          onClick={onBack}
          className="flex items-center mx-auto text-complement-600 hover:text-complement-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> メッセージに戻る
        </button>
      </motion.div>
    </div>
  )
}

export default LinkGenerator