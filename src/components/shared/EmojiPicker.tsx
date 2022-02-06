import React from "react";
import Picker, { IEmojiData } from "emoji-picker-react";

export interface EmojiPickerProps {
  onEmojiSelect: (data: IEmojiData) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => (
  <Picker
    onEmojiClick={(_, data) => {
      onEmojiSelect(data);
    }}
    disableSearchBar
    disableSkinTonePicker
    native
  />
);

export default EmojiPicker;
