import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo'; // Make sure the path to the Logo component is correct

export default function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src="/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full  object-cover"
        width={1920} // Adjust width and height as needed
        height={1080}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
        <div className="absolute -top-7 left-2">
          <Logo /> {/* Ensure that Logo component is styled appropriately */}
        </div>
        <div className="text-center text-white ">
          <h1 className="text-5xl mb-4" style={{fontFamily: 'cursive'}}>Welcome  <br /> <span className='text-lg' style={{fontFamily: 'cursive'}}> to</span></h1>
          <h1 className="text-5xl font-bold mb-4">EPC Information System</h1>
          <p className="text-xl mb-8 leading-relaxed px-4 md:px-8  max-w-[70%] mx-auto">
            Make sales and record keeping easy and convenient with EPC's Information System. Say goodbye to stress & lots of paperwork.
          </p>
          <div className="flex justify-center items-center flex-nowrap gap-x-4">
            <Link
              href="/login"
              className="bg-violet-700 hover:bg-violet-500 text-white py-4 px-8 rounded"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
