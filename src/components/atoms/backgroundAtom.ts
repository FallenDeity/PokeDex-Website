import { atom } from "recoil";

const BackgroundAtom = atom({
	key: "BackgroundAtom",
	default: "default.png",
});

export { BackgroundAtom };
