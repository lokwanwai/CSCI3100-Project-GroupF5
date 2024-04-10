import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

const AddToCart = ({ product, onAddcart }) => {
	const [itemCount, setItemCount] = React.useState(1);
	const isDisabled = itemCount < 1;
	return (
    		<div style={{ display: "block", padding: 30 }}>
    			<div>
    				<i class="bi bi-cart"></i>
				<i class="bi bi-dash-circle" onClick={() => {
    					setItemCount(Math.max(itemCount - 1, 0));
    				}}>
    					<div style={{ fontSize: '20px', color: '#111111' }}>
                        	${itemCount}
                    	</div>
    				</i>
    				<i class="bi bi-plus-circle" onClick={() => {
    						setItemCount(itemCount + 1);
    				}}></i>
				<button
		            className="btn add-button"
		            disabled={isDisabled}
					onClick={() => {onAddcart(product, itemCount)}}
		            style={{
			            backgroundColor: '#111111',
			            color: '#FFFFFF',
			            borderRadius: '40px',
			            padding: '12px 24px',
			            fontSize: '18px',
			            fontWeight: 'bold',
			            border: 'none',
			            cursor: isDisabled ? 'not-allowed' : 'pointer',
			            opacity: isDisabled ? 0.6 : 1,
			        }}>
    				"Add to Cart"
				</button>
    			</div>
    		</div>
    	);
    };

export default AddToCart;

