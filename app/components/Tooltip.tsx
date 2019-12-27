import * as React from 'react';
import * as PropTypes from 'prop-types';
import Hover from './Hover';

const styles = {
	container: {
		position: 'relative' as 'relative',
		display: 'flex' as 'flex',
	},
	tooltip: {
		boxSizing: 'border-box' as 'border-box',
		position: 'absolute' as 'absolute',
		width: '160px',
		bottom: '100%',
		left: '50%',
		marginLeft: '-80px',
		borderRadius: '3px',
		backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
		padding: '7px',
		marginBottom: '5px',
		color: '#fff',
		textAlign: 'center' as 'center',
		fontSize: '14px',
	},
};

interface TooltipProps {
	text: string;
	children?: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps): JSX.Element {
	return (
		<Hover>
			{(hovering: boolean): JSX.Element => (
				<div style={styles.container}>
					{hovering === true && (
						<div style={styles.tooltip}>{text}</div>
					)}
					{children}
				</div>
			)}
		</Hover>
	);
}

Tooltip.propTypes = {
	text: PropTypes.string.isRequired,
};
