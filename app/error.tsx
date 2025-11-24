'use client'
 
import { useEffect } from 'react'
import PageSection from './components/PageSection'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <PageSection colourWay="dark">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-xl mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-green text-black font-bold rounded-md hover:bg-white transition-colors"
        >
          Try again
        </button>
      </div>
    </PageSection>
  )
}
