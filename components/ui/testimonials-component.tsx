import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export type TestimonialItem = {
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  content: string
}

type TestimonialsComponentProps = {
  testimonials: TestimonialItem[]
}

import { Star, CheckCircle2 } from 'lucide-react'

// ... existing code ...

const TestimonialsComponent = ({ testimonials }: TestimonialsComponentProps) => {
  return (
    <section className='py-16 sm:py-24 lg:py-32 bg-gray-50/50 dark:bg-neutral-900/20'>
      <Carousel
        className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 md:grid-cols-2 lg:px-8'
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
      >
        {/* Left Content */}
        <div className='space-y-8 md:space-y-12'>
          <div className='space-y-6'>
            <Badge variant='outline' className='px-4 py-1 border-amber-500/20 text-amber-600 dark:text-amber-500 bg-amber-500/5 backdrop-blur-sm rounded-full tracking-widest text-xs font-bold uppercase'>
              Success Stories
            </Badge>
            <h2 className='text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]'>
              Trusted by Engineers at <span className="text-amber-500">Big Tech</span>
            </h2>
            <p className='text-gray-500 dark:text-gray-400 text-lg sm:text-xl antialiased leading-relaxed max-w-lg'>
              From career transitions to landing dream roles at Google, Meta, and Amazon—here&apos;s how SolveX empowered our community.
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <CarouselPrevious
              variant='outline'
              className='static size-12 rounded-full border-gray-200 dark:border-neutral-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-gray-600 dark:text-gray-400 hover:text-amber-600 transition-all transform translate-y-0'
            />
            <CarouselNext
              variant='outline'
              className='static size-12 rounded-full border-gray-200 dark:border-neutral-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-gray-600 dark:text-gray-400 hover:text-amber-600 transition-all transform translate-y-0'
            />
          </div>
        </div>
        <div className='relative'>
          <CarouselContent className='-ml-4'>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className='pl-4'>
                <div className='group/card relative flex flex-col gap-8 bg-white dark:bg-neutral-950 p-10 rounded-[2.5rem] border border-gray-100 dark:border-neutral-800 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all duration-300'>
                  {/* Verified Badge */}
                  <div className="absolute top-6 right-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 opacity-60 group-hover/card:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-emerald-600">Verified</span>
                  </div>
                  <div className='space-y-4'>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4",
                            i < testimonial.rating ? "fill-amber-500 text-amber-500" : "fill-gray-200 text-gray-200 dark:fill-neutral-800 dark:text-neutral-800"
                          )} 
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute -top-6 -left-4 text-6xl text-amber-500/20 font-serif leading-none select-none">
                        &ldquo;
                      </span>
                      <p className='text-gray-700 dark:text-gray-200 text-xl font-medium leading-relaxed antialiased relative z-10'>
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <Avatar className='size-14 rounded-2xl border-2 border-amber-500/10'>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
                      <AvatarFallback className='rounded-2xl bg-amber-500/10 text-amber-600 font-bold'>
                        {testimonial.name
                          .split(' ', 2)
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className='flex-1'>
                      <h4 className='text-lg font-bold text-gray-900 dark:text-white leading-none mb-1'>{testimonial.name}</h4>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {testimonial.role} <span className="mx-1">•</span> <span className="text-amber-600 dark:text-amber-500 font-medium">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  )
}

export default TestimonialsComponent
