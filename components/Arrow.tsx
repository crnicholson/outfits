export default function Arrow(props: { left: boolean; className?: string; onClick?: () => void }) {
    return (
        <button
            onClick={props.onClick}
            className={`cursor-pointer rounded-full bg-transparent absolute ${props.left ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 z-10 ${props.className}`}
            title={props.left ? "previous" : "next"}
        >
            <div className={`h-6 w-6 border-b border-r ${props.left ? "rotate-135" : "-rotate-45"}`}></div>
        </button>
    );
}