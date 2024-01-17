const CLERK_PUBLISHABLE_KEY = Bun.env.CLERK_PUBLISHABLE_KEY;

export const injectScriptToPanel = (html: string, prefix?: string) => {
  return html.replaceAll(
    "</style>\n</head>",
    `</style>\n<link rel="stylesheet" href="/public/custom-style.css"></link>\n<script type="text/javascript">window.CLERK_PUBLISHABLE_KEY="${CLERK_PUBLISHABLE_KEY}"</script>\n<script src="${
      prefix || ""
    }/public/trpc-panel-clerk.js"></script>\n</head>`,
  );
};
