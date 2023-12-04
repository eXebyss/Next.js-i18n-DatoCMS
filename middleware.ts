import { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'

const locales = ['en', 'ru']

function getLocale(request: NextRequest) {
	const { headers } = request

	const languages = headers.get('accept-language')

	const formattedLangs = languages
		? languages.split(',').map(lang => lang.split(';')[0])
		: null

	const defaultLocale = 'en'

	const matchedLocale = formattedLangs
		? match(formattedLangs, locales, defaultLocale)
		: null

	if (matchedLocale) {
		return matchedLocale
	}

	return defaultLocale
}

export function middleware(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl
	const pathnameHasLocale: boolean = locales.some(
		(locale: string): boolean =>
			pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)

	if (pathnameHasLocale) return

	// Redirect if there is no locale
	const locale = getLocale(request)
	request.nextUrl.pathname = `/${locale}${pathname}`
	// e.g. incoming request is /products
	// The new URL is now /en/products
	return Response.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
		// Optional: only run on root (/) URL
		// '/'
	],
}
