import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: 'public',
})

const nextConfig = {
    basePath: '/test',
     async redirects() {
        return [
            {
                source: '/',
                destination: '/test',
                basePath: false,
                permanent: false
            }
        ]
    }
};

export default withPWA(nextConfig);
