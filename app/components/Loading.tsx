import * as React from 'react';
import * as PropTypes from 'prop-types';

const styles: React.CSSProperties = {
	fontSize: '35px',
	position: 'absolute',
	left: '0',
	right: '0',
	marginTop: '20px',
	textAlign: 'center',
};

interface LoadingProps {
	text?: string;
	speed?: number;
}

/**
 * Displays loading text for use when fetching data from an API
 */
const Loading: React.FC<LoadingProps> = ({
	text = 'Loading',
	speed = 300,
}: LoadingProps) => {
	const [content, setContent] = React.useState(text);

	React.useEffect(() => {
		const id = window.setInterval((): void => {
			setContent((content) => {
				return content === `${text}...` ? text : `${content}.`;
			});
		}, speed);
		return () => window.clearInterval(id);
	}, [text, speed]);

	return <p style={styles}>{content}</p>;
};

Loading.propTypes = {
	text: PropTypes.string,
	speed: PropTypes.number,
};

export default Loading;
