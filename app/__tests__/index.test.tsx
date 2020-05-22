import React from 'react';
import App from '../App';
import Battle from '../components/Battle';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Tooltip from '../components/Tooltip';

import { render } from '@testing-library/react';

const ComponentsArray: Array<{
	component: React.FC<unknown>;
	attrs: Record<string, unknown>;
}> = [
	{ component: App, attrs: {} },
	{ component: Battle, attrs: {} },
	{
		component: Card,
		attrs: {
			header: 'test',
			avatar: 'test',
			href: 'test',
			name: 'test',
			children: <div></div>,
		},
	},
	{ component: Loading, attrs: {} },
	{ component: Tooltip, attrs: { text: 'test' } },
];

describe('Snapshots are matched for ', () => {
	ComponentsArray.forEach((ComponentObject) => {
		it(`${ComponentObject.component.name} component`, () => {
			const { component: Comp, attrs } = ComponentObject;
			const { asFragment } = render(<Comp {...attrs} />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
