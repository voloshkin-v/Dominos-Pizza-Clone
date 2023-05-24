import { useEffect } from 'react';

export function useOusideClick(elementRef, handler, attached = true) {
	useEffect(() => {
		if (!attached) return;

		const handleClickOutside = (e) => {
			if (!elementRef.current) return;

			if (!elementRef.current.contains(e.target)) {
				handler(false);
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [elementRef, handler, attached]);
}
