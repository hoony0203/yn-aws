/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://www.yeowoon.co.kr/",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 1,
  // sitemap 등록 제외 주소
  exclude: [],
  // robots.txt 옵션 설정
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
  },
};
