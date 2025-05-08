// export default function HomeSection1() {
//     return (
//         <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-[#F9F9F9] to-[#E5E5E5]">
//             <div className="flex flex-col items-center justify-center w-full h-full">
//                 <h1 className="text-4xl font-bold text-center text-gray-800">AI Skin Care</h1>
//                 <p className="mt-4 text-lg text-center text-gray-600">Discover your perfect skincare routine with our AI-powered recommendtions.</p>
//             </div>
//         </div>
//     );
// }

import Image from "next/image";

export default function HomeSection1() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
            <div className="flex justify-center items-center mt-[52px] w-[660px] h-[991px] select-none">
                <Image src="/images/homepage/woman.png" alt="woman" width={2048} height={3072} draggable="false" />
            </div>
        </div>
    );
}