import axios from 'axios'
import { PexelsResponse } from '@/types/types'

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

const pexelsClient = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: PEXELS_API_KEY,
    'Content-Type': 'application/json'
  }
})

// Function to fetch flower images from Pexels
export const fetchFlowerImages = async (page: number = 1, perPage: number = 15): Promise<PexelsResponse> => {
  try {
    const response = await pexelsClient.get('/search', {
      params: {
        query: 'flowers',
        page,
        per_page: perPage,
        orientation: 'portrait'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Error fetching flower images:', error)
    throw error
  }
}

// Function to search flower images
export const searchFlowerImages = async (query: string, page: number = 1, perPage: number = 15): Promise<PexelsResponse> => {
  try {
    const response = await pexelsClient.get('/search', {
      params: {
        query: `${query} flowers`,
        page,
        per_page: perPage,
        orientation: 'portrait'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Error searching flower images:', error)
    throw error
  }
}

// Function to fetch more flower images with a different query for variety
export const fetchMoreFlowerImages = async (page: number = 1, perPage: number = 15): Promise<PexelsResponse> => {
  try {
    const queries = ['roses', 'tulips', 'sunflower', 'lily flowers', 'cherry blossom', 'floral arrangement']
    const randomQuery = queries[Math.floor(Math.random() * queries.length)]
    
    const response = await pexelsClient.get('/search', {
      params: {
        query: randomQuery,
        page,
        per_page: perPage,
        orientation: 'portrait'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Error fetching more flower images:', error)
    throw error
  }
}