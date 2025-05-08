import Image from "next/image";

export default function HomeSection1() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
            <div className="absolute bottom-0 mx-auto max-w-[660px] max-h-[991px] select-none">
                <div className="absolute -bottom-[200px] left-1/2 w-[80%] h-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-500 to-blue-400 opacity-40 blur-[120px] pointer-events-none"></div>
                <div className="relative flex">
                    <Image src="/images/homepage/woman.png" alt="woman" width={2048} height={3072} draggable="false" />
                </div>
            </div>
        </div>
    );
}