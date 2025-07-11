export default function DownloadPage() {
  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 bg-black hero-gradient">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
        Download FocusTimer
      </h1>
      <p className="text-lg text-gray-400 mb-10 text-center max-w-xl">
        Get the latest version of FocusTimer for your device.
      </p>
      <div className="flex gap-4">
        <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-md font-semibold text-lg shadow-md hover:opacity-90 transition">Download for Windows</button>
        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-md font-semibold text-lg shadow-md hover:opacity-90 transition">Download for Mac</button>
      </div>
    </section>
  )
} 