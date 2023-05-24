import { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => {
	console.log(theme);
	return {
		root: {
			...theme.typography,
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			width: '20%',
			height: '50%',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(0, 3, 3),
		},
	};
});

const AdjustStock = ({
	adjustStockModalState,
	setAdjustStockModalState,
	data,
	setAdjustStockModalData,
	setData
}) => {
	const classes = useStyles();
	const [value, setValue] = useState('add');
	const [adjustQuantity, setAdjustQuantity] = useState(0);

	const handleClose = () => {
		setAdjustStockModalState(!adjustStockModalState);
		setAdjustStockModalData(null);
	};

	const handleSave = async () => {
		const response = await axios.post(
			`api/inventory/update/${data._id}`,
			{
				stockQuantity:
					value === 'add'
						? Number(data.stockQuantity) + Number(adjustQuantity)
						: Number(data.stockQuantity) - Number(adjustQuantity),
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (response.status == 200) {
			toast.success(response.data.message)
		} else {
			toast.error(response.data.message)
		}
		setData(response)
		console.log(response);
	};

	return (
		data && (
			<div>
				<Modal
					className={classes.modal}
					open={adjustStockModalState}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}>
					<Fade in={adjustStockModalState}>
						<div className={classes.paper}>
							<h3>Adjust Stock Quantity</h3>
							<hr />
							<Box marginBottom='10px'>
								<b>Item Name: </b> {data.itemName} <br />
							</Box>
							<Box marginBottom='10px'>
								<b>Current Stock: </b> {data.stockQuantity} <br />
							</Box>
							<FormControl component='fieldset' margin='normal'>
								<FormLabel component='legend'>Add or Reduce Stock</FormLabel>
								<RadioGroup
									name='stock'
									value={value}
									onChange={(e) => setValue(e.target.value)}>
									<FormGroup row>
										<FormControlLabel
											value='add'
											control={<Radio />}
											label='Add (+)'
										/>
										<FormControlLabel
											value='reduce'
											control={<Radio />}
											label='Reduce (-)'
										/>
									</FormGroup>
								</RadioGroup>
							</FormControl>
							<FormGroup row>
								<FormControl margin='normal'>
									<TextField
										id='outlined-number'
										label='Number'
										type='number'
										InputLabelProps={{
											shrink: true,
										}}
										InputProps={{ inputProps: { min: 0 } }}
										variant='outlined'
										size='small'
										value={adjustQuantity}
										onChange={(e) => setAdjustQuantity(e.target.value)}
									/>
								</FormControl>
							</FormGroup>
							<Box marginBottom='10px'>
								<b>Final Stock: </b>{' '}
								{value === 'add'
									? Number(data.stockQuantity) + Number(adjustQuantity)
									: Number(data.stockQuantity) - Number(adjustQuantity)}{' '}
								<br />
							</Box>
							<Box
								marginTop='25px'
								display='flex'
								justifyContent='space-evenly'>
								<Button variant='outlined' onClick={handleClose}>
									Cancel
								</Button>
								<Button
									variant='contained'
									color='primary'
									onClick={handleSave}>
									Save
								</Button>
							</Box>
						</div>
					</Fade>
				</Modal>
			</div>
		)
	);
};

export default AdjustStock;
