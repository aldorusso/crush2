import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ send }) => {
  const content = `google.com, ca-pub-3992058202623173, DIRECT, f08c47fec0942fa0\n`;

  send(
    new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }),
  );
};
