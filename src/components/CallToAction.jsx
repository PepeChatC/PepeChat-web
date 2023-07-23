import { AppStoreLink } from '@/components/AppStoreLink'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-green-800 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            PepeNet.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
   A super-scalable and high-end testnet designed to handle a significant amount of data and user interactions while simultaneously providing transparency and security against exploits and breaches. Additionally, it incentivizes active users of PepeChat with Native Tokens once the mainnet releases. Users retain ownership of their content, ensuring complete freedom without limitations.
          </p>
          <div className="mt-8 flex justify-center">
          <Button href="#" className="hidden lg:block">
            Click here to browse PepeNet
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
