interface SimpleCelebrationProps {
  gifUrl: string;
  user:string;
  message:string;
  photo:string;
}

export default function GifVip({
  gifUrl,
  user,
  message,
  photo,

}: SimpleCelebrationProps) {

  return (
    <div className="flex flex-col items-center h-[45vh] bg-black/40 text-white gap-2">
      <div className="relative w-full overflow-hidden h-[80px] bg-black/40 text-white text-2xl flex items-center">
          <div className="whitespace-nowrap animate-marquee">
              <div className="flex">
            <img src={photo} className="w-10 h-10 rounded-full border border-yellow-500 p-1"/>
            <span className="font-black px-2">{user}⭐VIP⭐:</span>
              </div>
            <p className="px-2 text-green-400 text-center">{message}</p>
          </div>
        </div>
      <img 
        src={gifUrl}
        alt="Celebration"
        className="w-[300px] md:w-[400px] h-[33vh] rounded-xl shadow-lg"
      />
    </div>
  );
}
