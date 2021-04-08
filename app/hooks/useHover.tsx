import * as React from 'react';

type UseHoverReturn = [boolean, React.HTMLAttributes<React.ReactNode>];

/**
 * Custom hook to return hovering status and attrs
 */
export default function useHover(): UseHoverReturn {
	const [hovering, setHovering] = React.useState(false);

	const mouseOver = (): void => setHovering(true);

	const mouseOut = (): void => setHovering(false);

	return [
		hovering,
		{
			onMouseOut: mouseOut,
			onMouseOver: mouseOver,
		},
	];
}
