// app/sitemap.js
export default function Sitemap(){
    return [
        {
            loc: "/",
            lastmod: new Date().toISOString(),
            changefreq: "daily",
            priority: 1.0,
        },
        {
            loc: "/about",
            lastmod: new Date().toISOString(),
            changefreq: "monthly",
            priority: 0.8,
        },
        {
            loc: "/env",
            lastmod: new Date().toISOString(),
            changefreq: "daily",
            priority: 0.8,
        }
    ];
  }