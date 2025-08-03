interface CloseButtonProps {
  onClick?: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        group
        w-10 h-10
        bg-red-400 
        hover:bg-red-500 
        active:scale-95 
        text-white 
        flex items-center justify-center 
        rounded-lg 
        transition-all duration-200 ease-in-out 
        shadow-md
      "
      aria-label="Закрыть"
    >
      <span
        className="
          relative 
          w-4 h-4 
          before:content-[''] 
          before:absolute 
          before:w-full before:h-[2px] 
          before:bg-white 
          before:rotate-45 
          before:top-1/2 before:left-0 
          after:content-[''] 
          after:absolute 
          after:w-full after:h-[2px] 
          after:bg-white 
          after:-rotate-45 
          after:top-1/2 after:left-0 
          transition-all duration-200 
          group-hover:scale-110
        "
      />
    </button>
  );
};
