import { useState } from "react";
import { House } from "lucide-react";

export function NeuButton() {

  return (
    <button class="p-2 rounded-full bg-[#F0F0F3] 
  transition-all duration-300
  shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)]
  active:shadow-[inset_-10px_-10px_10px_rgba(255,255,255,0.7),inset_10px_10px_10px_rgba(174,174,192,0.2)]">
    <House/>
</button>
  );
}
