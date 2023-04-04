import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://gorse.io",

  iconAssets: "https://at.alicdn.com/t/c/font_3748819_l4201g8napn.css",

  logo: "/logo.png",

  repo: "gorse-io/docs",

  repoDisplay: false,

  docsDir: "src",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  footer: "Apache 2 Licensed | Copyright © 2022-present zhenghaoz",

  displayFooter: true,

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  plugins: {
    comment: {
      provider: "Giscus",
      repo: "gorse-io/docs",
      repoId: "MDEwOlJlcG9zaXRvcnkzNTg4NjUwNjc",
      category: "Giscus",
      categoryId: "DIC_kwDOFWPYq84CSXxH",
    },

    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      figure: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: {
        flowchart: { useWidth: 100 }
      },
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    blog: {
      article: "/blog/",
      filter: ({ pathLocale, filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith(pathLocale.substring(1) + "posts/") : false
    }
  }
});
