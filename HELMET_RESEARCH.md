# Helmet.js Research Summary

## What Helmet Offers by Default

When you use `app.use(helmet())` with no configuration, Helmet automatically sets **13 security headers** by default:

1. **Content-Security-Policy (CSP)** - A powerful allow-list of what can happen on your page (mitigates XSS and injection attacks)
   - Default policy: `default-src 'self'`, `base-uri 'self'`, `font-src 'self' https: data:`, `form-action 'self'`, `frame-ancestors 'self'`, `img-src 'self' data:`, `object-src 'none'`, `script-src 'self'`, `script-src-attr 'none'`, `style-src 'self' https: 'unsafe-inline'`, `upgrade-insecure-requests`

2. **Cross-Origin-Opener-Policy** - Helps process-isolate your page (`same-origin`)

3. **Cross-Origin-Resource-Policy** - Blocks others from loading your resources cross-origin (`same-origin`)

4. **Origin-Agent-Cluster** - Changes process isolation to be origin-based (`?1`)

5. **Referrer-Policy** - Controls the Referer header (`strict-origin-when-cross-origin`)

6. **Strict-Transport-Security (HSTS)** - Tells browsers to prefer HTTPS (`max-age=31536000; includeSubDomains`)

7. **X-Content-Type-Options** - Avoids MIME sniffing (`nosniff`)

8. **X-DNS-Prefetch-Control** - Controls DNS prefetching (`off`)

9. **X-Download-Options** - Forces downloads to be saved (IE only, `noopen`)

10. **X-Frame-Options** - Legacy header that mitigates clickjacking (`SAMEORIGIN`)

11. **X-Permitted-Cross-Domain-Policies** - Controls cross-domain behavior for Adobe products (`none`)

12. **X-Powered-By** - **Removed** (prevents information disclosure about server technology)

13. **X-XSS-Protection** - **Disabled** by default (legacy header that can make things worse)

## Benefits to PulseVote Tech Stack

- **Quick integration**: Single line `app.use(helmet())` secures the Express backend
- **Low maintenance**: Sensible defaults work for most applications without tuning
- **Fully configurable**: Each header can be customized (like our custom CSP) or disabled individually
- **Defense in depth**: Multiple layers of protection against XSS, clickjacking, MIME sniffing, and information disclosure
- **Compliance ready**: Helps meet security headers requirements for production applications

## Custom CSP Configuration

Our custom CSP in `app.js` further restricts:
- `defaultSrc: ["'self'"]` - Only allow resources from same origin by default
- `scriptSrc: ["'self'", "https://apis.google.com"]` - Scripts only from self and Google APIs
- `styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]` - Styles from self, inline (required for some frameworks), and Google Fonts
- `fontSrc: ["'self'", "https://fonts.gstatic.com"]` - Fonts from self and Google Fonts CDN
- `imgSrc: ["'self'", "data:"]` - Images from self and data URIs
- `connectSrc: ["'self'", "http://localhost:5000"]` - API connections to self and backend

This prevents malicious script injection, unauthorized data exfiltration, and mixed content issues.

## Sources
- [Helmet.js GitHub Repository](https://github.com/helmetjs/helmet)
- [Helmet.js Official Website](https://helmetjs.github.io/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security/)
- [npm package page](https://www.npmjs.com/package/helmet)