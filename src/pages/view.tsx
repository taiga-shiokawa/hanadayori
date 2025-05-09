import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaHeart, FaHome } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'

interface MessageData {
  imageUrl: string
  photographer: string
  message: string
}

export default function ViewMessage() {
  const router = useRouter()
  const [messageData, setMessageData] = useState<MessageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (!router.isReady) return

    const { imageUrl, photographer, message } = router.query
    
    if (imageUrl && photographer && message) {
      setMessageData({
        imageUrl: String(imageUrl),
        photographer: String(photographer),
        message: String(message)
      })
    } else {
      // If no message data in URL, redirect to home
      router.push('/')
    }
    
    setLoading(false)
  }, [router.isReady, router.query])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!messageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-serif text-complement-800 mb-4">Message not found</h1>
        <p className="text-complement-600 mb-6">Sorry, this message link appears to be invalid or expired.</p>
        <Link href="/" className="btn-primary">
          Create a New Message
        </Link>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>A Flower Message For You | Blooming Messages</title>
        <meta name="description" content="Someone sent you a beautiful flower with a message" />
        <meta property="og:image" content={messageData.imageUrl} />
        <meta property="og:title" content="A Flower Message For You" />
        <meta property="og:description" content="Someone sent you a beautiful flower with a message" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <FaHeart className="text-primary-500 mr-2" />
              <span className="text-xl font-serif text-complement-800">花便り</span>
            </Link>
            <Link href="/" className="btn-secondary text-sm flex items-center">
              <FaHome className="mr-1" /> Home
            </Link>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="message-card max-w-md w-full overflow-hidden"
          >
            <div className="relative">
              <img 
                src={messageData.imageUrl} 
                alt="Flower message" 
                className="w-full h-auto"
              />
              {!showMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
                >
                  <button
                    onClick={() => setShowMessage(true)}
                    className="bg-white text-primary-600 font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    メッセージを読む
                  </button>
                </motion.div>
              )}
            </div>
            
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-white"
              >
                <p className="text-complement-700 font-serif whitespace-pre-wrap leading-relaxed">
                  {messageData.message}
                </p>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6, type: 'spring' }}
                  className="flex justify-center mt-6"
                >
                  <FaHeart className="text-4xl text-primary-500" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
          
          <div className="mt-8 text-center">
            <p className="text-complement-600 mb-4">
              お返しの花便りを作成してみますか？
            </p>
            <Link href="/" className="btn-primary">
              花便りを作成する
            </Link>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-complement-500 text-sm">
            &copy; {new Date().getFullYear()} Blooming Messages
          </div>
        </footer>
      </div>
    </>
  )
}