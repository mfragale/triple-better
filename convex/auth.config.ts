// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      // Your Convex site URL is provided in a system environment variable

      // eslint-disable-next-line n/no-process-env
      domain: process.env.CONVEX_SITE_URL,

      // Application ID has to be "convex"
      applicationID: "convex",
    },
  ],
};
