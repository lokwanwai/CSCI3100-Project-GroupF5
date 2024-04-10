import React from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Cart = ({ product, onAddcart }) => 
	const [itemCount, setItemCount] = React.useState(1);
	const isDisabled = itemCount < 1;
	return (
    		<div style={{ display: "block", padding: 30 }}>
    			<div>
    				<i class="bi bi-cart"></i>
				<i class="bi bi-dash-circle" onClick={() => {
    					setItemCount(Math.max(itemCount - 1, 0));
    				}}>
    					{" "}
    				</i>
    				<i class="bi bi-plus-circle" onClick={() => {
    						setItemCount(itemCount + 1);
    				}}>
				<button
		                    	className="btn add-button"
		                    	disabled={isDisabled}
					onClick={() => {onAddcart(product, itemCount)
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
    					}}
    				>
    					{"Add to Cart"}
				</button>
    			</div>
    		</div>
    	);
    }
};

export default AddToCart;
