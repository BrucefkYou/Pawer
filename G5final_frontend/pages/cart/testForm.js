import React, { useState, useEffect } from 'react'

export default function TestForm(props) {
	return (
		<>
		<div className="cart">
			<div className="row row-cols-1 row-cols-lg-3">
				<div className="col input-wrapper required">
					<input
						className="mt10 w-100 h-36p input-block"
						type="text"
						placeholder="收貨人"
						value={receiver}
						onChange={(e) => setReceiver(e.target.value)}
						required={selectedDelivery === 'convenience'}
					/>
				</div>
				<div className="col input-wrapper required">
					<input
						className="mt10 w-100 h-36p input-block"
						type="tel"
						placeholder="手機號碼"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required={selectedDelivery === 'convenience'}
					/>
				</div>
				<div className="col">
					<input
						className="mt10 w-100 h-36p input-block"
						type="tel"
						placeholder="市話(非必填)"
					/>
				</div>
			</div>
		</div>

		</>
	)
}
