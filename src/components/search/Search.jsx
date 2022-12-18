import React, { Component } from 'react'
import styles from './Search.module.css';

export default class Search extends Component {
	render() {
		const { name, cpf, handleChange, cidade, estado } = this.props;
		return (
			<section className={ styles.searchSection }>
				<p className={ styles.filterTitle }>Filtros</p>
				<div className={ styles.searchBox }>
					<div className={ styles.searchName }>
						<label className="form-label">Nome</label>
						<input 
							type="text"
							className="form-control"
							placeholder="Digite um nome"
							name="name"
							value={ name }
							onChange={ handleChange }
						/>
					</div>
					<div className={ styles.searchCPF }>
						<label className="form-label">CPF</label>
						<input 
							type="number"
							className="form-control"
							placeholder="Digite um CPF"
							name="cpf"
							value={ cpf }
							onChange={ handleChange }
						/>
					</div>
					<div className={ styles.searchCPF }>
						<label className="form-label">Cidade</label>
						<input 
							type="text"
							className="form-control"
							placeholder="Digite uma Cidade"
							name="cidade"
							value={ cidade }
							onChange={ handleChange }
						/>
					</div>	
					<div className={ styles.searchCPF }>
						<label className="form-label">Estado</label>
						<input 
							type="text"
							className="form-control"
							placeholder="Digite um estado"
							name="estado"
							value={ estado }
							onChange={ handleChange }
						/>
					</div>
					<div className={ styles.stateInput }>
							<p>Usuários por página</p>
							<select 
								className={ `form-select form-select-sm ${ styles.stateInput }` }
								onChange={ handleChange }
								name="usersPerPage"
							>
								<option value="5" selected >5</option>
								<option value="10" >10</option>
								<option value="20" >20</option>
								<option value="50" >50</option>
								<option value="100" >100</option>
							</select>
						</div>					
				</div>		
			</section>
		);
	}
}
