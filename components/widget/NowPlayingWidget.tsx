'use client';
import React, { useState, useEffect } from 'react';
import { OctagonX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getNowPlaying } from '@/api/spotifyNowPlaying';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';

interface NowPlaying {
	isPlaying: boolean;
	timePlayed: number;
	timeTotal: number;
	albumImageUrl: string;
	title: string;
	artist: string;
	songUrl: string;
}
const NowPlayingWidget = () => {
	const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

	useEffect(() => {
		const fetchNowPlaying = async () => {
			const data = await getNowPlaying();
			if (data !== null) {
				setNowPlaying(data);
			}
		};

		setInterval(() => {
			fetchNowPlaying();
		}, 1000);
	}, []);

	let secondsPlayed,
		songUrl,
		minutesPlayed,
		secondsTotal,
		minutesTotal,
		albumImageUrl,
		title,
		artist,
		progress;
	if (typeof nowPlaying === 'string') {
		if (nowPlaying === 'Currently Not Playing') {
			title = 'User is';
			artist = 'currently Offline';
		} else {
			title = 'Failed to';
			artist = 'fetch song';
		}
	} else if (nowPlaying && nowPlaying.isPlaying) {
		secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
		minutesPlayed = Math.floor(secondsPlayed / 60);
		secondsPlayed = (secondsPlayed % 60).toString().padStart(2, '0');

		secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
		minutesTotal = Math.floor(secondsTotal / 60);
		secondsTotal = (secondsTotal % 60).toString().padStart(2, '0');

		albumImageUrl = nowPlaying.albumImageUrl || <OctagonX />;
		title = nowPlaying.title;
		artist = nowPlaying.artist;
		songUrl = nowPlaying.songUrl;
		progress = (nowPlaying.timePlayed / nowPlaying.timeTotal) * 100;
	}
	return (
		<Card className='md:w-1/2 w-full'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>
					Spotify | Froilan&apos;s Now Playing
				</CardTitle>
				<svg
					className='w-10 h-10'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 496 512'>
					<path
						fill='#1ed760'
						d='M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z'
					/>
					<path d='M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7 27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z' />
				</svg>
			</CardHeader>
			<CardContent className='flex flex-col w-full'>
				<div className='flex flex-row w-full justify-center items-center gap-2'>
					{nowPlaying != null ? (
						nowPlaying.albumImageUrl ? (
							<Image
								src={nowPlaying.albumImageUrl}
								alt='Album Image'
								width={100}
								height={100}
								className='rounded-md'
							/>
						) : (
							<OctagonX />
						)
					) : (
						<OctagonX />
					)}
					<div className='flex flex-col gap-1 max-w-[70%]'>
						<h1 className='text-base font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'>
							{title}
						</h1>
						<h1 className='text-sm font-regular'>by {artist}</h1>
						<div className='flex flex-col gap-2'>
							<Progress
								className='w-full'
								value={progress}
							/>
							<div className='w-full flex flex-row justify-between'>
								<p className='text-xs  text-muted-foreground'>
									{minutesPlayed}:{secondsPlayed}
								</p>
								<p className='text-xs  text-muted-foreground'>
									{minutesTotal}:{secondsTotal}
								</p>
							</div>
						</div>
					</div>
				</div>

				<CardFooter className='p-0 flex justify-start mt-3'>
					{nowPlaying != null ? (
						<Button variant='outline'>
							{songUrl ? (
								<Link
									target='_blank'
									href={songUrl}>
									Open in Spotify
								</Link>
							) : (
								'Currently Not Playing'
							)}
						</Button>
					) : (
						<Button
							variant={'ghost'}
							disabled>
							Currently Not Playing
						</Button>
					)}
				</CardFooter>
			</CardContent>
		</Card>
	);
};

export default NowPlayingWidget;
