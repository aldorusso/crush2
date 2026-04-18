import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ send }) => {
  // Replace pub-XXXXXXXXXXXXXXXX with real publisher ID when AdSense is approved
  const content = `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n`;

  send(
    new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }),
  );
};
