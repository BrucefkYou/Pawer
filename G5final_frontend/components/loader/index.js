import React, { useState, useEffect } from 'react'

export default function Loader(props) {
	return (
		<>
			<div className='Loader-component'>
				<div class="lds-default">
				<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
				</div>
			</div>
		</>
	)
}
