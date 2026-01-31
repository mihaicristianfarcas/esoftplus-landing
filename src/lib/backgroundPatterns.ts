/**
 * Background pattern utilities for consistent styling across components
 * These functions generate CSS style objects for repeated background patterns
 */

import type { CSSProperties } from "react";

/**
 * Creates a dotted background pattern
 * Used in: TrackingCard, DashboardPreviewCard (light variant)
 */
export const getDottedBackground = (
	backgroundColor = "#f3f4f6",
	dotColor = "#d1d5db",
	dotSize = "1px",
	spacing = "20px"
): CSSProperties => ({
	backgroundColor,
	backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}, transparent ${dotSize})`,
	backgroundSize: `${spacing} ${spacing}`,
});

/**
 * Creates a radial gradient overlay (for fading edges)
 * Used in: TrackingCard, DashboardPreviewCard
 */
export const getRadialGradientOverlay = (
	color = "#f3f4f6",
	centerTransparency = "40%",
	edgeTransparency = "85%"
): CSSProperties => ({
	background: `radial-gradient(ellipse at 50% 50%, transparent ${centerTransparency}, ${color} ${edgeTransparency})`,
});

/**
 * Creates a striped diagonal pattern for icon buttons
 * Used in: Hero component icon button
 */
export const getDiagonalStripes = (): CSSProperties => ({
	backgroundImage:
		"repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,255,255, 0.3) 3px, rgba(255,255,255,0.1) 4px)",
});

// Cache commonly used patterns to avoid recreation (React best practice: js-cache-property-access)
export const DOTTED_BACKGROUND_LIGHT = getDottedBackground();
export const GRADIENT_OVERLAY_LIGHT = getRadialGradientOverlay();
