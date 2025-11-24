import Link from 'next/link'
import PageSection from './components/PageSection'
 
export default function NotFound() {
  return (
    <PageSection colourWay="dark">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl mb-4">Page Not Found</h2>
        <p className="text-xl mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-green text-black font-bold rounded-md hover:bg-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </PageSection>
  )
}
