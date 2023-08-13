import withOffline from 'next-offline'
import {PrismaPlugin} from '@prisma/nextjs-monorepo-workaround-plugin'

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ["@acme/api", "@acme/db", "@acme/components"],
    // We already do linting on GH actions
    eslint: {
        ignoreDuringBuilds: !!process.env.CI,
    },
    webpack: (config, {isServer}) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()]
        }

        return config
    },
};

export default withOffline(config);
