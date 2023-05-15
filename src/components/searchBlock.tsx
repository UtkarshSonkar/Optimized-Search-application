import React, { SetStateAction } from "react";
import "./searchBar.css";
type Props = {
  search: string;
  onChangeText: (e: { target: { value: SetStateAction<string> } }) => void;
};

const SearchBlock = ({ search, onChangeText }: Props) => {
  return (
    <div className="input-wrapper">
      <div>
        <input
          type="text"
          value={search}
          onChange={onChangeText}
          placeholder="Type..."
        ></input>
      </div>
    </div>
  );
};

export default SearchBlock;
