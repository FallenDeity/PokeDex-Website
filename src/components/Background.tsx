"use client";

import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

import { BackgroundAtom } from "@/components/atoms/backgroundAtom";

export default function BackGround(): React.JSX.Element {
	const [background, setBackground] = useRecoilState(BackgroundAtom);
	React.useEffect(() => {
		if (!background.includes("default")) return;
		const random = Math.floor(Math.random() * 9) + 1;
		setBackground(`${random}.jpg`);
	}, []);
	return (
		<div className="absolute z-[-1] flex h-screen w-full flex-col items-center justify-center">
			<Image src={`/backgrounds/${background}`} alt="Background" fill className="object-cover" />
		</div>
	);
}
