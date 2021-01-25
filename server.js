const sitemap =  require('nextjs-sitemap-generator');  // Import the package

const  { createServer }  =  require('http')

const  { parse }  =  require('url')

const next =  require('next')

  

const dev = process.env.NODE_ENV !==  'production'

const app =  next({ dev })

const handle = app.getRequestHandler()

  

/*

Here you is you have to use the sitemap function.

Using it here you are allowing to generate the sitemap file

only once, just when the server starts.

*/

sitemap({
//   alternateUrls: {
//     en: 'https://example.en',
//     es: 'https://example.es',
//     ja: 'https://example.jp',
//     fr: 'https://example.fr',
//   },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  ignoredPaths: ['admin'],
  extraPaths: ['/extraPath'],
  pagesDirectory: __dirname + "\\pages",
  targetDirectory : 'public/static/',
  sitemapFilename: 'sitemap.xml',
  nextConfigPath: __dirname + "\\next.config.js"
});

  

app.prepare().then(()  =>  {
  createServer((req,  res)  =>  {
    const  parsedUrl  =  parse(req.url,  true)
    const  {  pathname,  query  }  =  parsedUrl
    if (pathname  ===  '/a') {
      app.render(req,  res,  '/a',  query)
    }  
    else  if (pathname  ===  '/b') {
      app.render(req,  res,  '/b',  query)
    }  else  {
      handle(req,  res,  parsedUrl)
  }}).listen(3000,  (err)  =>  {
    if (err) throw  err
    console.log('> Ready on http://localhost:3000')
 })
})