import React, { Component } from 'react';
import styles from './PageTitle.module.css';

export default class PageTitle extends Component {
	render() {
		return (
			<header>
				<h1 className={ styles.pageTitle }>Controle de Usuários</h1>
			</header>
		)
	}
}
