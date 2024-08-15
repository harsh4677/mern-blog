export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-2xl mx-auto p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-white my-6'>
          About Sahand's Blog
        </h1>
        <div className='text-md text-gray-700 dark:text-gray-300 flex flex-col gap-6'>
          <p>
            Welcome to Sahand's Blog! This blog was created by Sahand Ghavidel
            as a personal project to share his thoughts and ideas with the
            world. Sahand is a passionate developer who loves to write about
            technology, coding, and everything in between.
          </p>

          <p>
            On this blog, you'll find weekly articles and tutorials on topics
            such as web development, software engineering, and programming
            languages. Sahand is always learning and exploring new
            technologies, so be sure to check back often for new content!
          </p>

          <p>
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. We believe that a community of learners can help
            each other grow and improve.
          </p>
        </div>
      </div>
    </div>
  );
}
