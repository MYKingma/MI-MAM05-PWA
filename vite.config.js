import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VitePWA({
      mode: "development",
      base: "/",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      // strategies: "injectManifest",
      manifest: {
        name: "MI-MAM05-PWA",
        short_name: "MedReas",
        description: "Study medical reasoning",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        gcm_sender_id:
          "BBP2ovYHYAJxmRGuY10yQy3u6Cztlmm7TfWKYBoEDB61MWfu_QAAeIrLgVMxF3krQZ43h0VKSFuLyI_6OjS89BI",
      },
      workbox: {
        importScripts: ["firebase-messaging-sw.js"],
      },
      // workbox: {
      //   cacheId: "MI-MAM05-PWA",
      //   runtimeCaching: [
      //     {
      //       urlPattern:
      //         /^https:\/\/firebasestorage.googleapis.com\/v0\/b\/mi-mam05-pwa.appspot.com\/.*/i,
      //       handler: "CacheFirst",
      //       method: "GET",
      //       options: {
      //         cacheName: "images",
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //   ],
      // },
      //     injectManifest: {
      //       runtimeCaching: [
      //         {
      //           urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      //           handler: "staleWhileRevalidate",
      //           options: {
      //             cacheName: "app-images",
      //             expiration: { maxEntries: 50 },
      //           },
      //         },
      //       ],
      //       globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,gif}"],
      //     },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
