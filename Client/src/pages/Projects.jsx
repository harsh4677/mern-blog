import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen  mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className=' px-6 py-3 text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      <CallToAction />
    </div>
  )
}

