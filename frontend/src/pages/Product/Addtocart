import React from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const Cart = ({ product, onAddcart }) => 
	const [itemCount, setItemCount] = React.useState(1);

	return (
    		<div style={{ display: "block", padding: 30 }}>
    			<div>
    				<Badge color="secondary" badgeContent={itemCount}>
    					<ShoppingCartIcon />{" "}
    				</Badge>
    				<ButtonGroup>
    					<Button
    						onClick={() => {
    							setItemCount(Math.max(itemCount - 1, 0));
    						}}
    					>
    						{" "}
    						<RemoveIcon fontSize="small" />
    					</Button>
    					<Button
    						onClick={() => {
    							setItemCount(itemCount + 1);
    						}}
    					>
    						{" "}
    						<AddIcon fontSize="small" />
    					</Button>
							<Button
    						onClick={() => {onAddcart(product, itemCount)}}
    					>
    						{"Add to Cart"}
    					</Button>
    				</ButtonGroup>
    			</div>
    		</div>
    	);
    }
};

export default Addtocart;
