'use client'

import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export function Editor() {
	return (
		<div className="h-[500px] w-[500px]">
			<Tldraw />
		</div>
	)
}