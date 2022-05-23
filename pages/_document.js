import { ServerStyleSheet } from 'styled-components'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'
import axios from 'axios'
import { createImageUrl } from '../utilities/imageUtils'


export default class MyDocument extends Document {

  
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    const getInitialArticleInfo = async (articleType, articleSlug) => {
      if (!articleType || !articleSlug) return {}
      try {
        const axiosInstance = axios.create();
        const response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}article-details`,
          { articleId: articleSlug, articleType },
          {
            headers: {
              Authorization: '',
            },
          }
        )
        if (response && response.data && response.data.data && response.data.data.article) {
          const res = {
            title: response.data.data.article.title,
            picUrl: response.data.data.article.picUrl,
            userId: response.data.data.article.userId,
            articleType: articleType
          }
          return res
        } else {
          return {}
        }
      } catch (err) {
        return {}
      }
    }
  


    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      const articleInfo = await getInitialArticleInfo(ctx.query.articleType, ctx.query.articleSlug)
      return {
        ...initialProps,
        ...articleInfo,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {

    const {title, picUrl, userId} = this.props

    return (
      <Html>
       <Head>
        <meta property="og:type"               content={title ? 'article' : ''}  key="ogtype"/>
        <meta property="og:title"              content={title ? title : 'ARTMO - The Art Network'} key="ogtitle" />
        <meta property="og:description"        content={userId ? ('by ' + userId.firstName + ' ' + userId.lastName) : 'See More...'}  key="ogdesc"/>
        <meta property="og:image"              content={picUrl && picUrl.pictureUrl
            ? createImageUrl(picUrl.pictureUrl)
            : '/assets/mo-fallback-image.png'}  key="ogimage"/>
       <meta name="google" content="notranslate"></meta>
       <script data-ad-client={process.env.NEXT_PUBLIC_REACT_APP_DATA_AD_CLIENT} async src={process.env.NEXT_PUBLIC_REACT_APP_DATA_AD_SOURCE}>
       </script>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-117248958-1`}
          />
          <script async src="https://www.googleoptimize.com/optimize.js?id=OPT-PGRZ2BV"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-117248958-1', {
              optimize_id: 'OPT-PGRZ2BV',
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
          dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:1751796,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
          <script
          dangerouslySetInnerHTML={{
              __html: `(function(w,d,t,r,u)
              {
                  var f,n,i;
                  w[u]=w[u]||[],f=function()
                  {
                      var o={ti:"134630941"};
                      o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
                  },
                  n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function()
                  {
                      var s=this.readyState;
                      s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
                  },
                  i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
              })
              (window,document,"script","//bat.bing.com/bat.js","uetq");
              `,
            }}
          />
        </Head>
        <body id="root">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}