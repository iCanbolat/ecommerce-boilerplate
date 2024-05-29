import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const parsedUrl = new URL(request.url);
  const hostname = parsedUrl.hostname;

  response.headers.set('x-domain', 'fatih');

  //const supabase = createServerClient(
  //  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //  {
  //    cookies: {
  //      get(name: string) {
  //        return request.cookies.get(name)?.value;
  //      },
  //      set(name: string, value: string, options: CookieOptions) {
  //        request.cookies.set({
  //          name,
  //          value,
  //          ...options,
  //        });
  //        response = NextResponse.next({
  //          request: {
  //            headers: request.headers,
  //          },
  //        });
  //        response.cookies.set({
  //          name,
  //          value,
  //          ...options,
  //        });
  //      },
  //      remove(name: string, options: CookieOptions) {
  //        request.cookies.set({
  //          name,
  //          value: '',
  //          ...options,
  //        });
  //        response = NextResponse.next({
  //          request: {
  //            headers: request.headers,
  //          },
  //        });
  //        response.cookies.set({
  //          name,
  //          value: '',
  //          ...options,
  //        });
  //      },
  //    },
  //  }
  //);

  //const { data, error } = await supabase.auth.getUser();

  //if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //  if (error || !data?.user) {
  //    return NextResponse.redirect(new URL('/login', request.url));
  //  }
  //  if (data.user && !data.user?.user_metadata.companyId) {
  //    return NextResponse.redirect(new URL('/starter', request.url));
  //  }
  //}

  //if (request.nextUrl.pathname.startsWith('/starter')) {
  //  if (error || !data?.user) {
  //    return NextResponse.redirect(new URL('/login', request.url));
  //  }
  //  if (data.user?.user_metadata.companyId) {
  //    return NextResponse.redirect(new URL('/dashboard', request.url));
  //  }
  //  NextResponse.next();
  //}

  //if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
  //  if (data?.user) {
  //    return NextResponse.redirect(new URL('/dashboard', request.url));
  //  }
  //}

  return response;
}
