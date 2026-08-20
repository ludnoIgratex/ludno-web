import Script from "next/script";
import "../../src/index.css";
import "../../src/App.css";
import YandexMetrikaPageview from "./yandex-metrika-pageview";
import { JsonLd, organizationSchema, websiteSchema } from "../../src/next/structured-data";

export const metadata = {
  metadataBase: new URL("https://ludno.ru"),
  title: "Архитектурные игровые и спортивные площадки | Людно",
  description: "Людно проектирует и производит архитектурные детские и спортивные площадки, оборудование для парков, дворов и общественных пространств.",
  applicationName: "Людно",
  verification: {
    google: "wNcpCIiTPx02OFNuXwkq_JFwOoionzLAg50d9gMX-nM",
    yandex: "01566f4a9307cd48",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <YandexMetrikaPageview />
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

            ym(103639967,"init",{
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/103639967"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
