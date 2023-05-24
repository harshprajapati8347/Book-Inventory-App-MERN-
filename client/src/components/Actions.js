import { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { Delete, Add, Close } from '@material-ui/icons';
import axios from 'axios';
import UpsertModal from './Upsert/UpsertModal';
import { toast } from 'react-toastify';

export const Actions = ({
	showLowStock,
	setShowLowStock,
	selected,
	setData,
}) => {
	const [addModalState, setaddModalState] = useState(false);
	const handledelete = async () => {
		const removed = await axios.post(
			'api/inventory/delete',
			{
				id: selected,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		console.log(removed);
		setData(removed);
		if (removed.status == 200) {
			toast.success(removed.data.message);
		} else {
			toast.error(removed.data.message);
		}
	};
	return (
		<Box
			component='div'
			mt={5}
			style={{
				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}>
			<Button
				color='primary'
				variant={showLowStock ? 'outlined' : 'text'}
				onClick={() => setShowLowStock((prevState) => !prevState)}>
				Show Low Stock {showLowStock && <Close fontSize='small' />}
			</Button>
			<Button
				variant='outlined'
				disabled={selected.length > 0 ? false : true}
				color={selected.length > 0 ? 'secondary' : 'primary'}
				onClick={handledelete}>
				<Delete />
				{'  '} Delete Selected
			</Button>
			<Button
				onClick={() => {
					console.log(!addModalState);
					setaddModalState(!addModalState);
				}}
				variant='contained'
				color='primary'>
				<Add />
				{'   '} Add To Inventory
			</Button>
			<UpsertModal
				modalState={addModalState}
				setModalState={setaddModalState}
				setData={setData}
				type='add'
				data={{}}
			/>
		</Box>
	);
};
