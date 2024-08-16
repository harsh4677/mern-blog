export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto px-8 py-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-center gap-4 mb-8'>
          <h1 className='text-5xl font-extrabold text-gray-900 dark:text-white'>
            About
          </h1>
          <span className='text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            B-Spot
          </span>
        </div>
        <div className='text-lg text-gray-700 dark:text-gray-300 flex flex-col gap-8'>
          <p className='leading-relaxed'>
            Welcome to <strong className='text-pink-500'>B-Spot</strong>!  
            B-Spot is more than just a blogging platform; it's a dynamic community where your voice can truly make an impact. Created by Harsh as a personal endeavor, B-Spot is crafted to be a space for sharing, learning, and connecting.
          </p>

          <div className='text-left'>
            <p className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              Our Mission
            </p>
            <p className='leading-relaxed'>
              At B-Spot, our mission is to provide an inclusive platform where individuals from all walks of life come together to share their thoughts, insights, and passions. We believe that everyone has a story to tell and valuable knowledge to offer. Whether you're an aspiring writer, a seasoned blogger, or simply someone with a unique perspective, B-Spot is here to amplify your voice.
            </p>
          </div>

          <div className='text-left'>
            <p className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              What We Offer
            </p>
            <ul className='list-disc list-inside space-y-2'>
              <li><strong>Diverse Content:</strong> Explore a rich variety of topics including technology, lifestyle, travel, personal development, and more. From in-depth articles to brief reflections, our platform supports all forms of expression.</li>
              <li><strong>Community Engagement:</strong> Connect with a like-minded community through comments, discussions, and interactions. B-Spot fosters constructive dialogue and meaningful connections.</li>
              <li><strong>Creative Freedom:</strong> Enjoy the freedom to write and publish content that reflects your personal style and interests. Our intuitive interface lets you focus on creating while we handle the technical details.</li>
              <li><strong>Learning Opportunities:</strong> Discover new ideas and gain fresh perspectives from fellow bloggers and readers. B-Spot is a place for continuous learning and growth.</li>
            </ul>
          </div>

          <div className='text-left'>
            <p className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              Why Join B-Spot?
            </p>
            <ul className='list-disc list-inside space-y-2'>
              <li><strong>Empowerment:</strong> Share your ideas and experiences with a global audience, build your online presence, and connect with others who share your passions.</li>
              <li><strong>Support:</strong> Our dedicated support team is here to assist you with technical and creative needs, ensuring you make the most of your blogging journey.</li>
              <li><strong>Inspiration:</strong> Draw inspiration from a diverse array of content and voices. B-Spot is a treasure trove of creativity and knowledge, waiting for you to explore.</li>
            </ul>
          </div>

          <p className='text-lg font-semibold mt-6'>
            <strong className='text-pink-500'>Join Us</strong>  
            Become part of the B-Spot community today and start sharing your voice with the world. Your stories, experiences, and insights are what make our platform special. Dive in, connect with others, and let’s embark on this journey of discovery together!
          </p>
        </div>
      </div>
    </div>
  );
}
