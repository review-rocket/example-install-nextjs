import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    let originUrl;

    const handleRouteChangeStart = (url) => {
      originUrl = document.location.href;
    };

    const handleRouteChangeComplete = (url) => {
      window.revgems('pageView', { referrer: originUrl });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const script = "(function(w,r){w._rg=r;if(typeof w[r]==='undefined'){w[r]=function(){w[r].q.push(Array.prototype.slice.call(arguments));w.localStorage.setItem(r,JSON.stringify(w[r].q));};w[r].q=JSON.parse(w.localStorage.getItem(r)||'[]');;w[r]('scriptLoad',{title:document.title,referrer_url:document.referrer,url:w.location.href,timestamp:new Date().getTime()})}})(window,'revgems')";
  const script2 = "window.REVGEMS_CONFIG = { endpoint: 'https://rev-tracking.lvh.me:5001/events' }";

  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{__html: script}}></script>
        <script dangerouslySetInnerHTML={{__html: script2}}></script>
        <script src="//rev-tracking.lvh.me:5001/assets/rg.js?api-key=km7hxrts358e" async></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
