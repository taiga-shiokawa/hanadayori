import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { fetchFlowerImages, fetchMoreFlowerImages, searchFlowerImages } from '@/utils/api'
import { FlowerImage } from '@/types/types'
import { FaSpinner, FaHeart, FaCamera } from 'react-icons/fa'
import { toast } from 'react-toastify'

// 花の種類のリスト（日本語: 英語）
const FLOWER_TYPES = [
  { ja: 'バラ', en: 'rose' },
  { ja: 'チューリップ', en: 'tulip' },
  { ja: 'ひまわり', en: 'sunflower' },
  { ja: 'ユリ', en: 'lily' },
  { ja: '桜', en: 'cherry blossom' },
  { ja: 'アジサイ', en: 'hydrangea' },
  { ja: 'デイジー', en: 'daisy' },
  { ja: 'ラン', en: 'orchid' },
  { ja: 'ボタン', en: 'peony' },
  { ja: 'ラベンダー', en: 'lavender' },
  { ja: 'ハイビスカス', en: 'hibiscus' },
  { ja: '蓮', en: 'lotus' },
  { ja: 'カーネーション', en: 'carnation' },
  { ja: 'ダリア', en: 'dahlia' },
  { ja: 'アイリス', en: 'iris' },
  { ja: 'ジャスミン', en: 'jasmine' },
  { ja: 'モクレン', en: 'magnolia' },
  { ja: 'ポピー', en: 'poppy' },
  { ja: '藤', en: 'wisteria' },
  { ja: 'ツツジ', en: 'azalea' },
  { ja: '椿', en: 'camellia' },
  { ja: 'コスモス', en: 'cosmos' },
  { ja: 'クチナシ', en: 'gardenia' },
  { ja: 'マリーゴールド', en: 'marigold' }
]

interface ImageSelectorProps {
  onSelectImage: (image: FlowerImage) => void
}

const ImageSelector = ({ onSelectImage }: ImageSelectorProps) => {
  const [images, setImages] = useState<FlowerImage[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFlower, setSelectedFlower] = useState<string>('')
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadInitialImages = async () => {
      try {
        setLoading(true)
        const data = await fetchFlowerImages()
        setImages(data.photos)
      } catch (err) {
        setError('花の画像の読み込みに失敗しました。もう一度お試しください。')
        toast.error('画像の読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    loadInitialImages()
  }, [])

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const data = selectedFlower 
        ? await searchFlowerImages(selectedFlower, nextPage)
        : await fetchMoreFlowerImages(nextPage)
      setImages(prev => [...prev, ...data.photos])
      setPage(nextPage)
    } catch (err) {
      toast.error('画像の読み込みに失敗しました')
    } finally {
      setLoadingMore(false)
    }
  }

  const handleFlowerSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedFlower(selectedValue)
    
    if (selectedValue) {
      try {
        setLoading(true)
        const data = await searchFlowerImages(selectedValue)
        setImages(data.photos)
        setPage(1)
      } catch (err) {
        toast.error('画像の読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    } else {
      // 選択を解除した場合は初期画像を表示
      try {
        setLoading(true)
        const data = await fetchFlowerImages()
        setImages(data.photos)
        setPage(1)
      } catch (err) {
        toast.error('画像の読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string
          const customImage: FlowerImage = {
            id: Date.now(),
            width: 0,
            height: 0,
            url: imageUrl,
            photographer: 'あなたの写真',
            photographer_url: '',
            photographer_id: 0,
            avg_color: '',
            src: {
              original: imageUrl,
              large2x: imageUrl,
              large: imageUrl,
              medium: imageUrl,
              small: imageUrl,
              portrait: imageUrl,
              landscape: imageUrl,
              tiny: imageUrl
            },
            liked: false,
            alt: 'アップロードした画像'
          }
          onSelectImage(customImage)
        }
        reader.readAsDataURL(file)
      } else {
        toast.error('画像ファイルを選択してください')
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="py-4">
      <h2 className="text-3xl font-serif text-complement-800 mb-6 text-center">
        花を選ぶ
      </h2>
      
      <p className="text-center text-complement-600 mb-8 max-w-2xl mx-auto">
        気持ちを伝えるのにぴったりの花を選びましょう。それぞれの花には特別な意味があります。
      </p>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label htmlFor="flower-select" className="block text-sm font-medium text-gray-700 mb-2">
            花の種類を選択
          </label>
          <select
            id="flower-select"
            value={selectedFlower}
            onChange={handleFlowerSelect}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">すべての花</option>
            {FLOWER_TYPES.map((flower) => (
              <option key={flower.en} value={flower.en}>
                {flower.ja} ({flower.en})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full btn-secondary flex items-center justify-center"
          >
            <FaCamera className="mr-2" />
            カメラロールから選択
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {loading && images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-complement-600 font-medium">美しい花を読み込み中...</p>
        </div>
      )}

      {error && images.length === 0 && (
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            もう一度試す
          </button>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {images.map(image => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            className="flower-image-container"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <div 
              className="message-card cursor-pointer h-96 overflow-hidden relative group"
              onClick={() => onSelectImage(image)}
            >
              <img 
                src={image.src.portrait} 
                alt={image.alt || '美しい花'} 
                className="object-cover w-full h-full flower-image"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaHeart className="text-white text-5xl opacity-80" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {images.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="btn-secondary flex items-center justify-center mx-auto"
          >
            {loadingMore ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                読み込み中...
              </>
            ) : (
              'もっと花を見る'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageSelector