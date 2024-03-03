const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "iXperience - Software Engineering 2024",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    smoothScroll: true,
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Capstone Project",
        link: "/capstone-project/",
      },
      {
        text: "Day 1",
        link: "/day-1/",
      },
      {
        text: "Day 2",
        link: "/day-2/",
      },
      {
        text: "Day 3",
        link: "/day-3/",
      },
      {
        text: "Day 4",
        link: "/day-4/",
      },
      {
        text: "Day 5",
        link: "/day-5/",
      },
      {
        text: "Day 6",
        link: "/day-6/",
      },
      {
        text: "Day 7",
        link: "/day-7/",
      },
      {
        text: "Day 8",
        link: "/day-8/",
      },
      {
        text: "Day 12",
        link: "/day-12/",
      },
      // {
      //   text: 'VuePress',
      //   link: 'https://v1.vuepress.vuejs.org'
      // }
    ],
    sidebar: {
      "/day-1/": [
        {
          title: "Day 1",
          collapsable: false,
          children: ["", "bootstrap"],
        },
      ],
      "/day-2/": [
        {
          title: "Day 2",
          collapsable: false,
          children: ["", "git"],
        },
      ],
      "/day-3/": [
        {
          title: "Day 3",
          collapsable: false,
          children: [
            "",
            // 'git',
          ],
        },
      ],
      "/day-4/": [
        {
          title: "Day 4",
          collapsable: false,
          children: ["", "props", "states_props"],
        },
      ],
      "/day-5/": [
        {
          title: "Day 5",
          collapsable: false,
          children: ["", "hooks", "context_api", "routes"],
        },
      ],
      "/day-6/": [
        {
          title: "Day 6",
          collapsable: false,
          children: ["", "full_stack"],
        },
      ],
      "/day-7/": [
        {
          title: "Day 7",
          collapsable: false,
          children: [""],
        },
      ],
      "/day-8/": [
        {
          title: "Day 8",
          collapsable: false,
          children: ["", "postman-testing"],
        },
      ],
      "/day-12/": [
        {
          title: "Day 12",
          collapsable: false,
          children: ["", "multer", "images"],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
