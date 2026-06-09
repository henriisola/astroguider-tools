export const metadata = {
  title: 'Page Not Found',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

  
  export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">Sorry, the page you are looking for doesn’t exist.</p>
      </div>
    );
  }
  