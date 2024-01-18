const CLERK_PUBLISHABLE_KEY = Bun.env.CLERK_PUBLISHABLE_KEY;

export interface InjectScriptToPanelOptions {
  prefix?: string;
  html: string;
  staticPath?: string;
}

export const injectScriptToPanel = ({
  prefix,
  html,
  staticPath = "",
}: InjectScriptToPanelOptions) => {
  return html.replaceAll(
    "</style>\n</head>",
    `</style>\n<link rel="stylesheet" href="${staticPath}/custom-style.css"></link>\n<script type="text/javascript">window.CLERK_PUBLISHABLE_KEY="${CLERK_PUBLISHABLE_KEY}"</script>\n<script src="${
      prefix || ""
    }${staticPath}/trpc-panel-clerk.js"></script>\n</head>`,
  );
};
