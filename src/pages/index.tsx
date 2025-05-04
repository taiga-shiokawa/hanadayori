import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import StepIndicator from '@/components/StepIndicator'
import ImageSelector from '@/components/ImageSelector'
import MessageComposer from '@/components/MessageComposer'
import LinkGenerator from '@/components/LinkGenerator'
import Footer from '@/components/Footer'
import { FlowerImage } from '@/types/types'

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<FlowerImage | null>(null)
  const [message, setMessage] = useState<string>('')
  const [generatedLink, setGeneratedLink] = useState<string>('')

  const handleImageSelect = (image: FlowerImage) => {
    setSelectedImage(image)
    setCurrentStep(2)
  }

  const handleMessageSubmit = (message: string) => {
    setMessage(message)
    setCurrentStep(3)
    
    // Generate a unique link with the selected image and message
    const params = new URLSearchParams({
      imageUrl: selectedImage?.src.large || '',
      photographer: selectedImage?.photographer || '',
      message: message
    })
    
    const link = `${window.location.origin}/view?${params.toString()}`
    setGeneratedLink(link)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          className="my-8"
        >
          {currentStep === 1 && (
            <ImageSelector onSelectImage={handleImageSelect} />
          )}
          
          {currentStep === 2 && (
            <MessageComposer 
              selectedImage={selectedImage} 
              onSubmit={handleMessageSubmit} 
              onBack={handleBack}
            />
          )}
          
          {currentStep === 3 && (
            <LinkGenerator 
              generatedLink={generatedLink}
              selectedImage={selectedImage}
              message={message}
              onBack={handleBack}
            />
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}