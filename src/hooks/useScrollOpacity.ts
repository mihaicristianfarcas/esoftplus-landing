import { useEffect, useState } from "react";

/**
 * Custom hook to calculate opacity based on scroll position
 * Applies React best practice: client-passive-event-listeners
 *
 * @param fadeDistance - Distance in pixels over which to fade (default: window height)
 * @returns opacity value between 0 and 1
 */
export const useScrollOpacity = (fadeDistance?: number) => {
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const distance = fadeDistance ?? window.innerHeight;

			// Calculate opacity: fade out as we scroll down
			// Starts fading at 0, fully transparent at fade distance
			const newOpacity = Math.max(0, 1 - scrollPosition / distance);
			setOpacity(newOpacity);
		};

		// Use passive event listener for better scroll performance
		// React best practice: client-passive-event-listeners
		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initial calculation
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, [fadeDistance]);

	return opacity;
};
