import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='flex flex-col items-center justify-between p-24'>
			<h1 className='text-yellow-500 font-bold lg:text-6xl m-4'>404</h1>
			<h2 className='lg:text-6xl m-4'>Not Found</h2>
			<p className='lg:text-lg m-4'>Could not find requested resource</p>
			<Link href='/' className='lg:text-base m-4 hover:text-yellow-500'>
				Return Home
			</Link>
		</main>
	)
}
