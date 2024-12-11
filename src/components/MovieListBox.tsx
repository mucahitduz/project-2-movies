import { ReactNode, useState } from "react";

interface MovieListBoxProps {
  children: ReactNode;
}

const MovieListBox = ({ children }: MovieListBoxProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

export default MovieListBox;
