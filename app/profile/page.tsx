"use client";
import { ChartSpline, Flame, Logs, Metronome, Stone } from "lucide-react";
import Image from "next/image";

const page = () => {
	return (
		<div className="w-full h-full flex flex-col items-center p-4 gap-4">
			<div className="w-full flex justify-between items-center">
				<div className="text-xl font-semibold">Статистика</div>
				<div className="relative w-10 aspect-square rounded-4xl overflow-hidden">
					<Image src="/station.png" alt="" fill unoptimized loading="eager" />
				</div>
			</div>
			<div className="w-full grid grid-cols-2 grid-rows-2 gap-2">
				<div className="flex gap-2 p-2 rounded-xl border border-foreground">
					<div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-2">
						<div className="h-max row-span-2 rounded-4xl bg-mauve-400/30 text-mauve-500 p-2">
							<Logs size={18} />
						</div>
						<div className="text-sm">Всего слов</div>
						<div className="text-sm">128</div>
					</div>
				</div>
				<div className="flex gap-2 p-2 rounded-xl border border-foreground">
					<div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-2">
						<div className="h-max row-span-2 rounded-4xl bg-emerald-400/30 text-emerald-500 p-2">
							<ChartSpline size={18} />
						</div>
						<div className="text-sm">Средний стрик</div>
						<div className="text-sm">12</div>
					</div>
				</div>
				<div className="flex gap-2 p-2 rounded-xl border border-foreground">
					<div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-2">
						<div className="h-max row-span-2 rounded-4xl bg-amber-400/30 text-amber-500 p-2">
							<Metronome size={18} />
						</div>
						<div className="text-sm">На повторении</div>
						<div className="text-sm">15</div>
					</div>
				</div>
				<div className="flex gap-2 p-2 rounded-xl border border-foreground">
					<div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-2">
						<div className="h-max row-span-2 rounded-4xl bg-accent/30 text-accent p-2">
							<Stone size={18} />
						</div>
						<div className="text-sm">Сложные</div>
						<div className="text-sm">6</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="text-lg font-bold">Активность</div>
				<div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2 p-3 rounded-xl border border-foreground">
					<div className="h-max row-span-2 rounded-xl bg-accent/30 text-accent p-2">
						<Flame size={20} />
					</div>
					<div>Сегодня</div>
					<div className="font-bold">12 слов</div>
				</div>
			</div>
		</div>
	);
};

export default page;
