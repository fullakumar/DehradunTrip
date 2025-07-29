export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-10 transition duration-300 hover:bg-gray-800">
      <p className="text-sm sm:text-base hover:scale-105 transform transition duration-300 ease-in-out">
        &copy; {new Date().getFullYear()} <span className="text-blue-400 hover:underline cursor-pointer">TripEase</span>. All rights reserved.
      </p>
    </footer>
  );
}
