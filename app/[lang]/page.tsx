import { performRequest } from '@/lib/datocms'
import { getDictionary } from '@/utils/dictionaries'
import { gql } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'
import { StructuredText } from 'react-datocms'

const HOME_PAGE_QUERY = gql`
	query HomePageQuery($locale: SiteLocale) {
		homePage(locale: $locale) {
			pageTitle
			homePageSlug
			bigHeading
			smallHeading
			heroText {
				value
			}
			heroImage {
				alt
				id
				width
				height
				url
			}
		}
	}
`

type TPageParams = {
	params: {
		lang: 'en' | 'ru'
	}
}

type TDict = {
	langButton: string
}

export default async function Home({ params: { lang } }: TPageParams) {
	const { homePage } = await performRequest({
		query: HOME_PAGE_QUERY,
		variables: { locale: lang },
	})

	const dict: TDict = await getDictionary(lang)

	const { pageTitle, bigHeading, smallHeading, heroText, heroImage } = homePage

	return (
		<main className='flex flex-col items-center justify-between p-24'>
			<h1 className='lg:text-6xl m-4'>{pageTitle}</h1>
			<h2 className='lg:text-5xl m-4'>{bigHeading}</h2>
			<h3 className='lg:text-4xl m-4'>{smallHeading}</h3>
			<Image
				src={heroImage.url}
				alt={heroImage.alt}
				width={heroImage.width}
				height={heroImage.height}
				className='m-4'
			/>
			<div className='lg:text-base m-4'>
				{/* @ts-ignore */}
				<StructuredText data={heroText.value} />
			</div>
			<Link
				href={`/${lang === 'en' ? 'ru' : 'en'}`}
				prefetch={false}
				className='border border-solid border-white rounded-lg p-4 hover:text-yellow-500'>
				{dict.langButton}
			</Link>
		</main>
	)
}
