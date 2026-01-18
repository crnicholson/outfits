import Image from "next/image";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    title: string;
    body: string;
    alt: string;
}

export default function ImageModal({
    isOpen,
    onClose,
    imageSrc,
    title,
    body,
    alt,
}: ImageModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white p-6 max-w-3xl max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border bg-black text-white text-xl"
                    aria-label="Close modal"
                >
                    <span>×</span>
                </button>

                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-full flex justify-center">
                        <Image
                            src={imageSrc}
                            alt={alt}
                            width={800}
                            height={800}
                            className="max-h-[45vh] w-auto object-contain"
                        />
                    </div>

                    <div className="text-center flex flex-col gap-2 pt-3 w-full">
                        <h2 className="font-bold">{title.toUpperCase()}</h2>
                        <p className="text-sm">{body.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
