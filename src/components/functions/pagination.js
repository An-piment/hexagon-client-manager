const setMaxPages = (users, userPerPage) => {
	const totalUsers = users.length;
	return Math.ceil(totalUsers / userPerPage);
}

export const showUsersOnPage = (users, userPerPage, currentPage) => {
	const maxPage = currentPage * userPerPage - 1;
	const minPage = (currentPage - 1) * userPerPage
	return users.filter((_user,index) => index >= minPage && index <= maxPage);
}

export const createPagination = (users, userPerPage, currentPage, handlePagination) => {
	const maxPages = setMaxPages(users, userPerPage);
	let extraPages = maxPages > 1 ? Array.from(Array(maxPages - 1).keys()) : [];
	extraPages = extraPages.length > 2 ? Array.from(Array(2).keys()) : extraPages;
	if (currentPage === 1) {
		if (maxPages === 1) {
			return (
				<li className="page-item active" aria-current="page">
					<span className="page-link">1</span>
				</li>	
			);
		}
		return (
			<>
				<li className="page-item active" aria-current="page">
					<span className="page-link">1</span>
				</li>
				{extraPages.length < 1 ? <></> 
					: extraPages.map((_page, index) => (
					<li 
						className="page-item" 
						key={ index }
						onClick={() => handlePagination(index + 2)}
					>
						<p className="page-link">{ index + 2 }</p>
					</li>
				))}
			</>
		);
	} else if (currentPage === maxPages) {
		if (maxPages === 2) {
			return (
			<>
				<li 
				className="page-item" 
				onClick={() => handlePagination(1)}
				>
					<p className="page-link">{ maxPages - 1}</p>
				</li>			
				<li className="page-item active" aria-current="page">
					<span className="page-link">{ maxPages }</span>
				</li>
			</>
			)				
		}
		return (
			<>
				<li
					className="page-item"
					onClick={() => handlePagination(maxPages - 2)}
				>
					<p className="page-link">{ maxPages - 2}</p>
				</li>
				<li
					className="page-item"
					onClick={() => handlePagination(maxPages - 1)}
				>
					<p className="page-link">{ maxPages - 1}</p>
				</li>			
				<li className="page-item active" aria-current="page">
					<span className="page-link">{ maxPages }</span>
				</li>
			</>			
		);
	}
	return (
		<>
			<li 
				className="page-item"
				onClick={() => handlePagination(currentPage - 1)}
			>
				<p className="page-link">{ currentPage - 1}</p>
			</li>
			<li className="page-item active" aria-current="page">
				<span className="page-link">{ currentPage }</span>
			</li>
			<li 
				className="page-item"
				onClick={() => handlePagination(currentPage + 1)}
			>
				<p className="page-link">{ currentPage + 1}</p>
			</li>			
		</>					
	);
}