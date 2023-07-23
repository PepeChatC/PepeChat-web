import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image';

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

import { Container } from '@/components/Container'

const reviews = [
  {
    href: '/images/kehve.png',
    author: 'Kehvelson, Blockchain Dev',
  },
  {
    href: '/images/T.png',
    author: 'Mr T, Lead Dev',
  },
  {
    href: '/images/abc.png',
    author: 'DrDerprespect',
  },
  {
    href: '/images/crash.png',
    author: 'Crash, CMO',
  },
  {
    href: '/images/abc.png',
    author: 'Sunwukong, App/Dapp Developer',
  },
  {
    href: '/images/zero.png',
    author: 'Bogdanoff,Security Specialist and App developer',
  },
]

function Review({ title, body, author, rating, className, href, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
        <Image src={href} alt={author} layout="responsive" width={500} height={300} />


      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef()
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef()
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  columns = [columns[0], columns[1], splitArray(columns[2], 2)]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  'md:hidden',
                reviewIndex >= columns[0].length && 'lg:hidden'
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && 'lg:hidden'
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
          {reviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="team"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
        Meet the PepeChat Team
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
