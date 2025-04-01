"use client"
import { useEffect } from "react";

const Trailer = ({ videoId, open, setOpen }: { videoId: string; open: boolean; setOpen: (value: boolean) => void }) => {
  useEffect(() => {
    if (!open) {
      setOpen(false);
    }
  }, [open, setOpen]);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="flex justify-center items-center z-4 fixed bg-black/80 w-screen h-screen mt-[-70px] pb-[100px]"
        >
          <iframe
            width="800"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Trailer;
