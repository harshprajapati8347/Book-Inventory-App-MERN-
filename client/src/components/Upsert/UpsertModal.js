import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddForm from './AddForm';
import EditForm from './EditForm';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '70%',
		height: '85%',
		overflow: 'scroll',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const UpsertModal = ({ modalState, setModalState, type, data, setData }) => {
	const classes = useStyles();

	const handleClose = () => {
		setModalState(!modalState);
	};

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={modalState}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={modalState}>
					<div className={classes.paper}>
						{type === 'add' ? (
							<>
								{' '}
								<h3 id='transition-modal-title'>Create Item</h3>
								<AddForm setData={setData} />
							</>
						) : (
							<>
								{' '}
								<h3 id='transition-modal-title'>Edit Item</h3>
								<EditForm setData={setData} data={data} />{' '}
							</>
						)}
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default UpsertModal;
