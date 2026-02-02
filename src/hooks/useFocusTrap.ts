import { useEffect, useRef } from "react";

/**
 * Custom hook to trap focus within a container
 * Useful for modals, mobile menus, and dialogs
 *
 * @param isActive - Whether the focus trap is currently active
 * @returns ref to attach to the container element
 */
export const useFocusTrap = (isActive: boolean) => {
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isActive || !containerRef.current) return;

		const container = containerRef.current;
		const focusableElements = container.querySelectorAll(
			'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);

		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[
			focusableElements.length - 1
		] as HTMLElement;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return;

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		container.addEventListener("keydown", handleKeyDown);
		return () => container.removeEventListener("keydown", handleKeyDown);
	}, [isActive]);

	return containerRef;
};
