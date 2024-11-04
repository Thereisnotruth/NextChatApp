import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: 'public',
    workboxOptions: {
        disableDevLogs: true
    }
})

const nextConfig = {
    reactStrictMode: false, 
    basePath: '/test',
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/test',
                basePath: false,
                permanent: false
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/(.)',
                headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: '',
                },
                {
                    key: 'Access-Control-Allow-Credentials',
                    value: 'true',
                },
                {
                    key: 'Access-Control-Allow-Methods',
                    value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                },
                {
                    key: 'Access-Control-Allow-Headers',
                    value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                },
                ],
            },
        ]
    }
};

export default withPWA(nextConfig);
