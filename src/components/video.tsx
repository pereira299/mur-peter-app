"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
}

const Video = ({ src, ...props }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onPlay = () => {
            setIsPlaying(true);
            setHasStarted(true);
        };
        const onPause = () => setIsPlaying(false);

        v.addEventListener("play", onPlay);
        v.addEventListener("pause", onPause);
        v.addEventListener("ended", onPause);

        return () => {
            v.removeEventListener("play", onPlay);
            v.removeEventListener("pause", onPause);
            v.removeEventListener("ended", onPause);
        };
    }, []);

    const togglePlay = async () => {
        const v = videoRef.current;
        if (!v) return;

        try {
            if (v.paused) {
                await v.play();
                setIsPlaying(true);
            } else {
                v.pause();
                setIsPlaying(false);
            }
        } catch (e) {
            // Falha ao tentar reproduzir (autoplay bloqueado, etc.) — silenciar para não quebrar
            console.error("Falha ao alterar estado do vídeo:", e);
        }
    };

    return (
        // 'group' é usado para controlar a visibilidade do botão no hover do parent
        <div onClick={togglePlay} className="relative group h-[65vh] lg:h-[72vh] rounded-3xl shadow-lg w-full lg:w-9/12 bg-black">
            <video
                {...props}
                ref={videoRef}
                className="h-[65vh] lg:h-[72vh] rounded-3xl shadow-lg w-full object-cover"
            >
                <source src={src} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
            </video>

            {/* Botão de play/pause: visível somente quando o pai é hover (group-hover) */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <button
                    type="button"
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                    className={`pointer-events-auto rounded-full bg-black/60 hover:bg-black/70 p-4 text-white shadow-lg z-20 transition-opacity duration-200 ${!hasStarted ? "opacity-100" : "opacity-0 group-hover:opacity-100"} flex items-center justify-center`}
                >
                    {isPlaying ? (
                        <Pause size={28} />
                    ) : (
                        <Play size={28} />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Video;