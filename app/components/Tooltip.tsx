import * as React from 'react';
import * as PropTypes from 'prop-types';
import Hover from './Hover';

const styles: Record<string, React.CSSProperties> = {
	container: {
		position: 'relative',
		display: 'flex',
	},
	tooltip: {
		boxSizing: 'border-box',
		position: 'absolute',
		width: '160px',
		bottom: '100%',
		left: '50%',
		marginLeft: '-80px',
		borderRadius: '3px',
		backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
		padding: '7px',
		marginBottom: '5px',
		color: '#fff',
		textAlign: 'center',
		fontSize: '14px',
	},
};

interface TooltipProps {
	text: string;
	children?: React.ReactNode;
}

/**
 * Renders a tooltip with information over component
 *
 * @class      Tooltip (name)
 * @return     {<type>}  { description_of_the_return_value }
 */
const Tooltip: React.FC<TooltipProps> = ({ text, children }: TooltipProps) => {
	return (
		<Hover>
			{(hovering: boolean): React.ReactNode => (
				<div style={styles.container}>
					{hovering === true && (
						<div style={styles.tooltip}>{text}</div>
					)}
					{children}
				</div>
			)}
		</Hover>
	);
};

Tooltip.propTypes = {
	text: PropTypes.string.isRequired,
};

export default Tooltip;
