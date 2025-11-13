import React from 'react'
import Link from 'next/link'
export default function AboutPage(){


  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="flex items-center flex-col justify-center p-4 ring-1 h-fit w-fit rounded-2xl ring-neutral-600">

        <div className="ring-1  ring-cyan-950 p-4 rounded-2xl flex flex-row">
          <div className="flex items-center flex-col justify-center p-5 m-5 ring-1 h-fit w-fit rounded-2xl ring-neutral-600 ">

            <div className="ring-1 ring-cyan-950 p-4 rounded-2xl w-3xs">
              <h2>Learning Nextjs:</h2>
              <p>
                This is a quick test project to check the uses
                of nextjs to aply in my next proyect.
              </p>
              <p > About the next proyect, ill be developing a dashboard (only a dashboard) that will
                 be like a to-do task list composed of 4 parts.
                It should'nt be hard as long as i don try to add some tricky and way out of my level stuff.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center flex-col justify-center p-4 ring-1 h-fit w-fit rounded-2xl ring-neutral-600">

              <div className=" flex flex-col justify-center items-center ring-1 ring-cyan-950 p-4 rounded-2xl">
                <p>To check the documentation used for this:</p>
                <div className='flex flex-row w-fit h-fit justify-center items-center transition hover:drop-shadow-[0_0_10px_#3b82f6]'>
                  <img src={'/vercel.svg'} className='w-12 h-12'></img>
                  <Link target ='_blank' href={'https://nextjs.org/docs'}>
                  <p className='text-5xl'>
                    NextJs
                  </p>
                  </Link>
                </div>
                <div className='flex flex-row w-fit h-fit ustify-center items-center transition hover:drop-shadow-[0_0_10px_#3b82f6]'>
                  <Link target ='_blank' href={'https://docs.dndkit.com'}>
                     <img src={'/dnd-logo.svg'} className='w-70 h-20'></img>

                  </Link>
                </div>
                <p>
                  A little test for the next project:
                </p>
                <div>
                  <Link href={'/dnd-tree'} className="flex flex-row justify-center items-center px-4 py-2 text-white transition hover:drop-shadow-[0_0_10px_#FFFF00]">
                  <img src={'/file.svg'} className='w-5 h-5'></img>
                  <p>
                    Go to Test Procces tree
                  </p>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
