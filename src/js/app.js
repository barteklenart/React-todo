import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './components/Todo';

class App extends React.Component {

	render(){
		return (
			<Todo>
				{this.props.children}
			</Todo>
		)
	}
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);