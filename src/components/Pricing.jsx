import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logomark } from '@/components/Logo'

const plans = [
  {
    name: 'Phase 1',
    description:
      'Kickstarter to our visions.',
    features: [
      'Token Launch',
      'Testnet Launch',
      'Build up Social Media presence',
      'Build a community',
    ],
    logomarkClassName: 'fill-gray-300',
  },
  {
    name: 'Phase 2',
    description:
      'We will focus on listings and establishing our presence via our marketers here',
    features: [
      'CG listing',
      'CMC listing',
      'PepeNet DAO establishment',
      'Partnerships',
      'Press releases',
    ],
    logomarkClassName: 'fill-gray-500',
  },
  {
    name: 'Phase 3',
    featured: true,
    description:
      'You ask, We Deliver',
    features: [
      'Release NFT sets',
      'PepeChat Mainnet launch',
      'PepeChat Staking and Incentive mechanism for users',
      'Beta PepeChat app launch',
    ],
    logomarkClassName: 'fill-cyan-500',
  },
]

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Plan({
  name,
  price,
  description,
  button,
  features,
  featured = false,
  activePeriod,
  logomarkClassName,
}) {
  return (
    <section
      className={clsx(
        'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5',
        featured ? 'order-first bg-gray-900 lg:order-none' : 'bg-white'
      )}
    >
      <h3
        className={clsx(
          'flex items-center text-sm font-semibold',
          featured ? 'text-white' : 'text-gray-900'
        )}
      >
        <Logomark className={clsx('h-6 w-6 flex-none', logomarkClassName)} />
        <span className="ml-4">{name}</span>
      </h3>
      <p
        className={clsx(
          'relative mt-5 flex text-3xl tracking-tight',
          featured ? 'text-white' : 'text-gray-900'
        )}
      >
      </p>
      <p
        className={clsx(
          'mt-3 text-sm',
          featured ? 'text-gray-300' : 'text-gray-700'
        )}
      >
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            '-my-2 divide-y text-sm',
            featured
              ? 'divide-gray-800 text-gray-300'
              : 'divide-gray-200 text-gray-700'
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex py-2">
              <CheckIcon
                className={clsx(
                  'h-6 w-6 flex-none',
                  featured ? 'text-white' : 'text-cyan-500'
                )}
              />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Pricing() {
  let [activePeriod, setActivePeriod] = useState('Monthly')
  let [selectedBox, setSelectedBox] = useState(0)

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="py-20 bg-gray-100 border-t border-gray-200 sm:py-32"
    >
      <Container>
      <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Roadmap
          </h2>
          <p className="mt-2 text-lg text-gray-600">
          We Hope To Achieve The Following in our initial phases:
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <div className="relative">
            <RadioGroup
              value={selectedBox}
              onChange={setSelectedBox}
              className="grid grid-cols-3"
            >
              {["Phase 1", "Phase 2", "Phase 3"].map((period,index) => (
                <RadioGroup.Option
                  key={period}
                  value={index}
                  className={clsx(
                    'cursor-pointer border border-gray-300 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm text-gray-700 outline-2 outline-offset-2 transition-colors hover:border-gray-400',
                    period === 'Monthly'
                      ? 'rounded-l-lg'
                      : '-ml-px rounded-r-lg'
                  )}
                >
                  {period}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
            <div
              aria-hidden="true"
              className={clsx(
                'pointer-events-none absolute inset-0 z-10 grid grid-cols-3 overflow-hidden rounded-lg bg-cyan-500 transition-all duration-300',
                selectedBox === 0 && '[clip-path:inset(0_66%_0_0)]',
                selectedBox === 1 && '[clip-path:inset(0_33%_0_calc(33%-1px))]',
                selectedBox === 2 && '[clip-path:inset(0_0_0_calc(66%-1px))]'
              )}
            >
              {["Phase 1", "Phase 2", "Phase 3"].map((period,index) => (
                <div
                  key={index}
                  className={clsx(
                    'py-2 text-center text-sm font-semibold text-white [&:not(:focus-visible)]:focus:outline-none'                  )}
                >
                  {period}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid items-start max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Plan key={plan.name} {...plan} activePeriod={activePeriod} featured={index === selectedBox} />
          ))}
        </div>
      </Container>
    </section>
  )
}
