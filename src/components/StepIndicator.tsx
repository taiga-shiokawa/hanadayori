import { motion } from 'framer-motion'
import { FaImage, FaEdit, FaShareAlt } from 'react-icons/fa'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  const steps = [
    { name: 'Choose Image', icon: <FaImage /> },
    { name: 'Write Message', icon: <FaEdit /> },
    { name: 'Share Link', icon: <FaShareAlt /> }
  ]

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center relative">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 h-1 bg-gray-200 w-full -z-10 transform -translate-y-1/2"></div>
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary-500 -z-5 transform -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        
        {/* Step Indicators */}
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          
          return (
            <div key={index} className="flex flex-col items-center z-10">
              <motion.div 
                className={`flex items-center justify-center w-12 h-12 rounded-full text-lg mb-2
                  ${isActive || isCompleted 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-500'}`}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive || isCompleted ? '#F43F5E' : '#E5E7EB' 
                }}
                transition={{ duration: 0.3 }}
              >
                {step.icon}
              </motion.div>
              <p className={`text-sm font-medium ${isActive ? 'text-complement-800' : 'text-complement-500'}`}>
                {step.name}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator