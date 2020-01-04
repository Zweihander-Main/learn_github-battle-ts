import * as React from 'react';

interface HoverProps extends React.Props<Hover> {
	children: (hovering: boolean) => JSX.Element;
}

interface HoverState {
	hovering: boolean;
}

/**
 * Hover Render Prop to allow adding hovering state to a component
 *
 * @class      Hover (name)
 */
export default class Hover extends React.Component<HoverProps, HoverState> {
	state = {
		hovering: false,
	};

	mouseOver = (): void => {
		this.setState({
			hovering: true,
		});
	};

	mouseOut = (): void => {
		this.setState({
			hovering: false,
		});
	};

	render(): JSX.Element {
		return (
			<div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
				{this.props.children(this.state.hovering)}
			</div>
		);
	}
}
