import React, { useEffect } from 'react';

export function useOusideClick(
	elementRef: React.RefObject<HTMLDivElement>,
	handler: (arg: boolean) => void,
	attached = true
) {
	useEffect(() => {
		if (!attached) return;

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target;

			if (!(target instanceof Node)) {
				return;
			}

			if (!elementRef.current) {
				return;
			}

			if (!elementRef.current.contains(target)) {
				handler(false);
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [elementRef, handler, attached]);
}
